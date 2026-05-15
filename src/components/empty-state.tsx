import { ReactNode } from "react";

export function EmptyState({
  title,
  body,
  icon,
  action,
}: {
  title: string;
  body?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="paper-card mx-auto max-w-md rounded-3xl p-10 text-center">
      {icon && <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">{icon}</div>}
      <h3 className="font-bangla text-xl">{title}</h3>
      {body && <p className="font-bangla mt-2 text-sm text-muted-foreground">{body}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function CardSkeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="paper-card animate-pulse rounded-2xl p-6">
      <div className="h-4 w-1/3 rounded bg-secondary" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="mt-3 h-3 w-full rounded bg-secondary/70" />
      ))}
    </div>
  );
}
