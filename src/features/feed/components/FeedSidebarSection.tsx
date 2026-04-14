import type { ReactNode } from "react";
import { AppCard } from "@/components/common/AppCard";

type FeedSidebarSectionProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
};

function FeedSidebarSection({ title, actionLabel, onAction, children }: FeedSidebarSectionProps) {
  return (
    <AppCard
      radius="lg"
      size="sm"
      header={<span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</span>}
      action={
        actionLabel ? (
          <button
            type="button"
            onClick={onAction}
            className="text-xs font-semibold text-primary
              hover:underline transition-colors"
          >
            {actionLabel}
          </button>
        ) : undefined
      }
    >
      {children}
    </AppCard>
  );
}

export default FeedSidebarSection;
