import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { Cpu, Navigation, Fuel, Cog, ChevronRight } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

const systems = [
  {
    id: "engine",
    name: "Engine System",
    icon: Cog,
    status: "normal" as const,
    params: [
      { label: "RPM", value: "12,450", unit: "rpm" },
      { label: "EGT", value: "645", unit: "°C" },
      { label: "Oil Pressure", value: "72", unit: "PSI" },
      { label: "Vibration", value: "0.12", unit: "mm/s" },
    ],
  },
  {
    id: "fuel",
    name: "Fuel System",
    icon: Fuel,
    status: "warning" as const,
    params: [
      { label: "Total Fuel", value: "18,240", unit: "kg" },
      { label: "Flow Rate", value: "2,840", unit: "kg/h" },
      { label: "Temp", value: "22", unit: "°C" },
      { label: "Remaining", value: "6.4", unit: "hrs" },
    ],
  },
  {
    id: "nav",
    name: "Navigation System",
    icon: Navigation,
    status: "normal" as const,
    params: [
      { label: "GPS Status", value: "Locked", unit: "" },
      { label: "Heading", value: "274", unit: "°" },
      { label: "Altitude", value: "35,000", unit: "ft" },
      { label: "Ground Speed", value: "487", unit: "kts" },
    ],
  },
];

const logs = [
  { time: "14:32:08", system: "ENG-01", event: "Oil temperature nominal at 92°C", level: "INFO" },
  { time: "14:28:45", system: "FUEL-SYS", event: "Cross-feed valve actuated - tank balance", level: "INFO" },
  { time: "14:22:11", system: "NAV-SYS", event: "ILS approach mode activated RWY 28L", level: "INFO" },
  { time: "14:18:33", system: "ENG-02", event: "Vibration spike detected: 0.18 mm/s", level: "WARN" },
  { time: "14:15:02", system: "HYD-SYS", event: "System A pressure drop to 2,840 PSI", level: "WARN" },
  { time: "14:10:47", system: "ELEC", event: "Generator 2 load sharing adjusted", level: "INFO" },
  { time: "14:05:19", system: "ENG-01", event: "Bleed air valve cycling detected", level: "WARN" },
  { time: "14:00:00", system: "APU", event: "APU shutdown - bleed air no longer required", level: "INFO" },
];

const Systems = () => {
  const [selected, setSelected] = useState("engine");
  const activeSystem = systems.find(s => s.id === selected)!;

  return (
    <DashboardLayout title="SYSTEM DETAILS">
      {/* System Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {systems.map((sys, i) => (
          <motion.button
            key={sys.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(sys.id)}
            className={`glass-card-hover p-5 text-left transition-all ${
              selected === sys.id ? "border-primary/40 shadow-[0_0_20px_-4px_hsl(195_100%_50%/0.2)]" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                  <sys.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="font-display text-sm font-semibold tracking-wider text-foreground">{sys.name}</span>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${selected === sys.id ? "rotate-90 text-primary" : ""}`} />
            </div>
            <StatusBadge status={sys.status} />
          </motion.button>
        ))}
      </div>

      {/* Detail View */}
      <motion.div
        key={selected}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-6"
      >
        <h3 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">
          {activeSystem.name.toUpperCase()} — PARAMETERS
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {activeSystem.params.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-lg bg-secondary/50 border border-border"
            >
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">{p.label}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-display font-bold text-foreground">{p.value}</span>
                <span className="text-xs text-muted-foreground">{p.unit}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-5"
      >
        <h3 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">SYSTEM LOGS</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Time</th>
                <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">System</th>
                <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Event</th>
                <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">Level</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, i) => (
                <motion.tr
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.03 }}
                  className="border-b border-border/50 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-2.5 px-3 font-mono text-xs text-muted-foreground">{log.time}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-primary">{log.system}</td>
                  <td className="py-2.5 px-3 text-xs text-foreground">{log.event}</td>
                  <td className="py-2.5 px-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      log.level === "WARN" ? "status-warning" : "status-normal"
                    }`}>
                      {log.level}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Systems;
