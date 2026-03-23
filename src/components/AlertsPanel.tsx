import { motion } from "framer-motion";
import { AlertTriangle, Info, XCircle } from "lucide-react";

const alerts = [
  { id: 1, type: "warning" as const, message: "Hydraulic pressure approaching lower threshold", time: "2 min ago", system: "HYD-SYS" },
  { id: 2, type: "critical" as const, message: "Engine #2 vibration levels exceeded normal range", time: "8 min ago", system: "ENG-02" },
  { id: 3, type: "info" as const, message: "Navigation system recalibration complete", time: "15 min ago", system: "NAV-SYS" },
  { id: 4, type: "warning" as const, message: "Fuel consumption rate above nominal by 3.2%", time: "22 min ago", system: "FUEL-SYS" },
  { id: 5, type: "info" as const, message: "APU start cycle completed successfully", time: "31 min ago", system: "APU" },
];

const iconMap = {
  warning: AlertTriangle,
  critical: XCircle,
  info: Info,
};

const colorMap = {
  warning: "text-warning border-warning/20 bg-warning/5",
  critical: "text-destructive border-destructive/20 bg-destructive/5",
  info: "text-accent border-accent/20 bg-accent/5",
};

export function AlertsPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="glass-card p-5"
    >
      <h3 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">RECENT ALERTS</h3>
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
        {alerts.map((alert, i) => {
          const Icon = iconMap[alert.type];
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className={`flex items-start gap-3 p-3 rounded-lg border ${colorMap[alert.type]} transition-colors`}
            >
              <Icon className="w-4 h-4 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{alert.message}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-mono text-muted-foreground">{alert.system}</span>
                  <span className="text-[10px] text-muted-foreground">• {alert.time}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
