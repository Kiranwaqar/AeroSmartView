interface StatusBadgeProps {
  status: "normal" | "warning" | "critical";
}

const labels = { normal: "Normal", warning: "Warning", critical: "Critical" };

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`status-${status} px-2.5 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-1.5`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "normal" ? "bg-success" : status === "warning" ? "bg-warning" : "bg-destructive"
      } ${status === "critical" ? "animate-pulse" : ""}`} />
      {labels[status]}
    </span>
  );
}
