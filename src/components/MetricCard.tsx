import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { StatusBadge } from "./StatusBadge";

interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  icon: LucideIcon;
  status: "normal" | "warning" | "critical";
  trend?: string;
  delay?: number;
}

export function MetricCard({ title, value, unit, icon: Icon, status, trend, delay = 0 }: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="glass-card-hover p-5 flex flex-col gap-3"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <StatusBadge status={status} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
        <div className="flex items-baseline gap-1.5">
          <span className="text-2xl font-display font-bold text-foreground">{value}</span>
          <span className="text-sm text-muted-foreground">{unit}</span>
        </div>
      </div>
      {trend && <p className="text-xs text-success">{trend}</p>}
    </motion.div>
  );
}
