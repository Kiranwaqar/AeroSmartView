import { DashboardLayout } from "@/components/DashboardLayout";
import { MetricCard } from "@/components/MetricCard";
import { AlertsPanel } from "@/components/AlertsPanel";
import { TrendChart } from "@/components/TrendChart";
import { Thermometer, Gauge, Fuel, Activity } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout title="FLIGHT OVERVIEW">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Temperature" value="78" unit="°C" icon={Thermometer} status="normal" trend="▲ 2.1% from last hour" delay={0} />
        <MetricCard title="Pressure" value="14.7" unit="PSI" icon={Gauge} status="normal" trend="Stable" delay={0.1} />
        <MetricCard title="Fuel Level" value="74" unit="%" icon={Fuel} status="warning" trend="▼ 4.2% consumption rate" delay={0.2} />
        <MetricCard title="Engine Health" value="97" unit="%" icon={Activity} status="normal" trend="Optimal performance" delay={0.3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <TrendChart title="TEMPERATURE TREND" dataKey="temp" color="#00d4ff" unit="°C" />
        <TrendChart title="ENGINE PERFORMANCE" dataKey="engine" color="#4d8eff" unit="%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <TrendChart title="FUEL CONSUMPTION" dataKey="fuel" color="#f59e0b" unit="%" />
        <AlertsPanel />
      </div>
    </DashboardLayout>
  );
};

export default Index;
