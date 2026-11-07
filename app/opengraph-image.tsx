import { ImageResponse } from "next/og";
import { PLATFORM_METRICS } from "@/consts/platform-metrics";

export const alt = "Karmicup — Free Reddit upvotes and comments from real users";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ORANGE = "#F97316";

/** Default social share image for every route (prerendered at build time). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background:
            "radial-gradient(circle at 85% 10%, #FFEDD5 0%, #FFFFFF 55%)",
          color: "#0A0A0A",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: ORANGE,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Upvote arrow (same shape as Tabler's arrow-big-up-filled) */}
            <svg width="36" height="36" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M10.586 3l-6.586 6.586a2 2 0 0 0 -.434 2.18l.068 .145a2 2 0 0 0 1.78 1.089h2.586v7a2 2 0 0 0 2 2h4l.15 -.005a2 2 0 0 0 1.85 -1.995l-.001 -7h2.587a2 2 0 0 0 1.414 -3.414l-6.586 -6.586a2 2 0 0 0 -2.828 0z" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 800 }}>
            karmic<span style={{ color: ORANGE }}>up</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              fontSize: 76,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
            }}
          >
            Free Reddit upvotes from&nbsp;
            <span style={{ color: ORANGE }}>real people.</span>
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#525252" }}>
            Engage with the community, earn points, boost your posts. No bots.
          </div>
        </div>

        <div style={{ display: "flex", gap: 56, fontSize: 28, color: "#525252" }}>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#0A0A0A", fontWeight: 800 }}>
              {PLATFORM_METRICS.members}
            </span>
            members
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ color: "#0A0A0A", fontWeight: 800 }}>
              {PLATFORM_METRICS.postsBoosted}
            </span>
            posts boosted
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <span style={{ color: ORANGE, fontWeight: 800 }}>100%</span>
            free
          </div>
        </div>
      </div>
    ),
    size,
  );
}
