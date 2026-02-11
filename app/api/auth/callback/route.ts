import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  try {
    if (!code) throw new Error("No code provided");

    const supabaseAuth = await supabaseServer();
    const { error: sessionError } =
      await supabaseAuth.auth.exchangeCodeForSession(code);
    if (sessionError) throw sessionError;

    const {
      data: { user },
    } = await supabaseAuth.auth.getUser();
    if (!user) throw new Error("No user found");

    // CHECK IF USER EXISTS & CHECK FOR ONBOARDING
    const supabase = supabaseAdmin;

    const { data: userInfo } = await supabase
      .from("user_info")
      .select("id, reddit_accounts(id)")
      .eq("id", user.id)
      .single();

    if (userInfo) {
      const hasRedditAccount =
        Array.isArray(userInfo.reddit_accounts) &&
        userInfo.reddit_accounts.length > 0;
      return NextResponse.redirect(
        `${origin}/${hasRedditAccount ? "dashboard" : "onboarding"}`
      );
    }

    // ADD USER TO SUPABASE
    const { error: userInfoError } = await supabase.from("user_info").insert({
      id: user.id,
      email: user.email || "",
      name: user.user_metadata?.full_name || user.user_metadata?.name || "",
    });

    if (userInfoError) throw userInfoError;

    return NextResponse.redirect(`${origin}/onboarding`);
  } catch (error) {
    console.error("Auth callback error:", error);
    return NextResponse.redirect(`${origin}/login`);
  }
}
