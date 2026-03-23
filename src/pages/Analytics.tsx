import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell } from "recharts";
import { Brain, TrendingUp, Shield, Zap } from "lucide-react";

const performanceData = [
  { name: "Engine 1", efficiency: 96, reliability: 98, temp: 74 },
  { name: "Engine 2", efficiency: 92, reliability: 94, temp: 82 },
  { name: "APU", efficiency: 88, reliability: 97, temp: 68 },
  { name: "Hydraulic", efficiency: 95, reliability: 99, temp: 45 },
  { name: "Electrical", efficiency: 97, reliability: 96, temp: 38 },
];

const radarData = [
  { subject: "Thrust", A: 95 },
  { subject: "Fuel Eff.", A: 88 },
  { subject: "Vibration", A: 92 },
  { subject: "Temp", A: 85 },
  { subject: "Oil Press.", A: 97 },
  { subject: "RPM", A: 91 },
];

const faultPredictions = [
  { component: "Engine Bearing #2", probability: 12, risk: "low", eta: "~2400 flight hours" },
  { component: "Hydraulic Pump A", probability: 34, risk: "medium", eta: "~800 flight hours" },
  { component: "Fuel Valve Actuator", probability: 8, risk: "low", eta: "~3200 flight hours" },
  { component: "Bleed Air System", probability: 56, risk: "high", eta: "~200 flight hours" },
];

const pieData = [
  { name: "Nominal", value: 72 },
  { name: "Advisory", value: 18 },
  { name: "Caution", value: 8 },
  { name: "Warning", value: 2 },
];
const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"];

const metrics = [
  { label: "Overall Health", value: 94, icon: Shield, color: "bg-success" },
  { label: "Efficiency Index", value: 91, icon: TrendingUp, color: "bg-primary" },
  { label: "Reliability Score", value: 97, icon: Zap, color: "bg-accent" },
];

const Analytics = () => {
  return (
    <DashboardLayout title="ANALYTICS">
      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {metrics.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card-hover p-5"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
                <m.icon className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs uppercase tracking-wider text-muted-foreground">{m.label}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-display font-bold text-foreground">{m.value}%</span>
            </div>
            <div className="mt-3 h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${m.value}%` }}
                transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                className={`h-full ${m.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-5">
          <h3 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">SYSTEM PERFORMANCE</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 16% 18%)" />
                <XAxis dataKey="name" stroke="hsl(215 15% 35%)" tick={{ fontSize: 10 }} />
                <YAxis stroke="hsl(215 15% 35%)" tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 16% 20%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210 20% 92%)" }} />
                <Bar dataKey="efficiency" fill="#00d4ff" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reliability" fill="#4d8eff" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-5">
          <h3 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">ENGINE RADAR ANALYSIS</h3>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(220 16% 18%)" />
                <PolarAngleAxis dataKey="subject" stroke="hsl(215 15% 45%)" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis stroke="hsl(215 15% 25%)" tick={{ fontSize: 9 }} />
                <Radar name="Performance" dataKey="A" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Fault Prediction + System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="glass-card p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-4 h-4 text-primary" />
            <h3 className="font-display text-sm font-semibold tracking-wider text-foreground">FAULT PREDICTION (AI)</h3>
          </div>
          <div className="space-y-3">
            {faultPredictions.map((f, i) => (
              <motion.div
                key={f.component}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
                className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50 border border-border"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{f.component}</p>
                  <p className="text-xs text-muted-foreground">ETA: {f.eta}</p>
                </div>
                <div className="w-32">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${f.probability}%` }}
                      transition={{ duration: 1, delay: 0.7 + i * 0.1 }}
                      className={`h-full rounded-full ${
                        f.risk === "low" ? "bg-success" : f.risk === "medium" ? "bg-warning" : "bg-destructive"
                      }`}
                    />
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  f.risk === "low" ? "status-normal" : f.risk === "medium" ? "status-warning" : "status-critical"
                }`}>
                  {f.probability}%
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="glass-card p-5">
          <h3 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">SYSTEM STATUS</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" stroke="none">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(220 18% 10%)", border: "1px solid hsl(220 16% 20%)", borderRadius: "8px", fontSize: "12px", color: "hsl(210 20% 92%)" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-2">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                  <span className="text-muted-foreground">{d.name}</span>
                </div>
                <span className="font-medium text-foreground">{d.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
