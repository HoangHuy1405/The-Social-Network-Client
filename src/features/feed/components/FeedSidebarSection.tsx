import type { ReactNode } from "react";

type FeedSidebarSectionProps = {
  title: string;
  actionLabel?: string;
  onAction?: () => void;
  children: ReactNode;
};

function FeedSidebarSection({ title, actionLabel, onAction, children }: FeedSidebarSectionProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</span>
        {actionLabel && (
          <button
            type="button"
            onClick={onAction}
            className="text-xs font-semibold text-primary
              hover:underline transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export default FeedSidebarSection;
