"use client";

import { SubmissionCard } from "@/components/dashboard/my-submissions/submission-card";
import { StatsGrid } from "@/components/dashboard/my-submissions/stats-grid";
import { SubmitLinkDialog } from "@/components/dashboard/my-submissions/submit-link-dialog";
import { useSubmissions, type Submission } from "@/hooks/use-submissions";
import { useUserInfo } from "@/hooks/use-user-info";
import { IconPlus } from "@tabler/icons-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface MySubmissionsClientPageProps {
  submissions: Submission[];
}

export default function MySubmissionsClientPage({
  submissions,
}: MySubmissionsClientPageProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { setSubmissions, submissions: storedSubmissions } = useSubmissions();
  const { data: userInfo } = useUserInfo();

  useEffect(() => {
    setSubmissions(submissions);
  }, [submissions, setSubmissions]);

  return (
    <div className="p-6">
      <SubmitLinkDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        userPoints={userInfo.points}
      />

      <header className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">
            My Submissions
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Track the engagement your Reddit posts and comments are receiving.
          </p>
        </div>
        <button
          onClick={() => setDialogOpen(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20 mt-0.5 shrink-0"
        >
          <IconPlus className="w-4 h-4" stroke={2.5} />
          Submit link
        </button>
      </header>

      <StatsGrid submissions={storedSubmissions} />

      <section className="space-y-3">
        {storedSubmissions.map((submission, i) => (
          <SubmissionCard key={submission.id} submission={submission} index={i} />
        ))}
      </section>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => setDialogOpen(true)}
        className="mt-4 p-5 rounded-2xl border-2 border-dashed border-stone-200 flex flex-col items-center text-center hover:border-primary/30 hover:bg-primary/[0.02] transition-all cursor-pointer group"
      >
        <div className="w-9 h-9 rounded-xl bg-stone-100 group-hover:bg-primary/10 flex items-center justify-center mb-2.5 transition-colors">
          <IconPlus
            className="w-5 h-5 text-stone-400 group-hover:text-primary transition-colors"
            stroke={2.5}
          />
        </div>
        <p className="text-sm font-semibold text-stone-600 group-hover:text-stone-800 transition-colors">
          Submit a new link
        </p>
        <p className="text-xs text-stone-400 mt-0.5">
          Share a Reddit post or comment to get free engagement
        </p>
      </motion.div>
    </div>
  );
}
