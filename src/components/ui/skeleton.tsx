export function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted/30 ${className ?? ''}`} />;
}
