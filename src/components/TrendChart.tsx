import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const data = [
  { time: "00:00", temp: 72, pressure: 14.5, fuel: 92, engine: 97 },
  { time: "04:00", temp: 74, pressure: 14.3, fuel: 88, engine: 96 },
  { time: "08:00", temp: 78, pressure: 14.7, fuel: 84, engine: 98 },
  { time: "12:00", temp: 82, pressure: 14.2, fuel: 79, engine: 95 },
  { time: "16:00", temp: 76, pressure: 14.6, fuel: 74, engine: 97 },
  { time: "20:00", temp: 73, pressure: 14.4, fuel: 70, engine: 96 },
  { time: "24:00", temp: 71, pressure: 14.5, fuel: 66, engine: 98 },
];

interface TrendChartProps {
  title: string;
  dataKey: string;
  color: string;
  unit: string;
}

export function TrendChart({ title, dataKey, color, unit }: TrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass-card p-5"
    >
      <h3 className="font-display text-sm font-semibold tracking-wider mb-4 text-foreground">{title}</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`grad-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220 16% 18%)" />
            <XAxis dataKey="time" stroke="hsl(215 15% 35%)" tick={{ fontSize: 10 }} />
            <YAxis stroke="hsl(215 15% 35%)" tick={{ fontSize: 10 }} unit={unit} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(220 18% 10%)",
                border: "1px solid hsl(220 16% 20%)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "hsl(210 20% 92%)",
              }}
            />
            <Area type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} fill={`url(#grad-${dataKey})`} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
