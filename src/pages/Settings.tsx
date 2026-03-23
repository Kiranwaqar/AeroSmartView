import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { motion } from "framer-motion";
import { Save, RotateCcw, Bell, Palette, Zap, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface Settings {
  apiUrl: string;
  refreshInterval: number;
  enableNotifications: boolean;
  enableDarkMode: boolean;
  alertThreshold: number;
  autoRefresh: boolean;
}

const Settings = () => {
  const [settings, setSettings] = useState<Settings>(() => {
    const saved = localStorage.getItem("aerosmart-settings");
    return saved
      ? JSON.parse(saved)
      : {
          apiUrl: localStorage.getItem("apiUrl") || "http://localhost:3001",
          refreshInterval: 10,
          enableNotifications: true,
          enableDarkMode: true,
          alertThreshold: 75,
          autoRefresh: true,
        };
  });

  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key: keyof Settings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem("aerosmart-settings", JSON.stringify(settings));
    localStorage.setItem("apiUrl", settings.apiUrl);
    setHasChanges(false);
    toast.success("Settings saved successfully!");
  };

  const handleReset = () => {
    const defaultSettings: Settings = {
      apiUrl: "http://localhost:3001",
      refreshInterval: 10,
      enableNotifications: true,
      enableDarkMode: true,
      alertThreshold: 75,
      autoRefresh: true,
    };
    setSettings(defaultSettings);
    setHasChanges(true);
    toast.info("Settings reset to defaults");
  };

  const settingGroups = [
    {
      title: "API Configuration",
      icon: Zap,
      settings: [
        {
          label: "API URL",
          key: "apiUrl" as const,
          type: "text",
          description: "Backend API endpoint URL",
        },
      ],
    },
    {
      title: "Notifications",
      icon: Bell,
      settings: [
        {
          label: "Enable Notifications",
          key: "enableNotifications" as const,
          type: "toggle",
          description: "Receive real-time alerts and notifications",
        },
        {
          label: "Alert Threshold (%)",
          key: "alertThreshold" as const,
          type: "number",
          description: "Trigger alerts when metrics exceed this percentage",
        },
      ],
    },
    {
      title: "Display",
      icon: Palette,
      settings: [
        {
          label: "Dark Mode",
          key: "enableDarkMode" as const,
          type: "toggle",
          description: "Use dark theme throughout the application",
        },
      ],
    },
    {
      title: "Performance",
      icon: Zap,
      settings: [
        {
          label: "Auto Refresh",
          key: "autoRefresh" as const,
          type: "toggle",
          description: "Automatically refresh data at intervals",
        },
        {
          label: "Refresh Interval (seconds)",
          key: "refreshInterval" as const,
          type: "number",
          description: "How often to fetch new data (minimum 5 seconds)",
        },
      ],
    },
  ];

  return (
    <DashboardLayout title="SETTINGS">
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-auto grid-cols-4 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      API Configuration
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Configure backend API connection
                    </p>
                  </div>
                  <Zap className="w-4 h-4 text-primary" />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="apiUrl" className="text-xs font-medium">
                    API URL
                  </Label>
                  <Input
                    id="apiUrl"
                    type="text"
                    placeholder="http://localhost:3001"
                    value={settings.apiUrl}
                    onChange={(e) =>
                      handleSettingChange("apiUrl", e.target.value)
                    }
                    className="bg-secondary/50 border-primary/20 focus:border-primary"
                  />
                  <p className="text-xs text-muted-foreground">
                    Backend API endpoint for data fetching
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      Notification Settings
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Manage alerts and notifications
                    </p>
                  </div>
                  <Bell className="w-4 h-4 text-primary" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-primary/10">
                    <div>
                      <Label className="text-xs font-medium">
                        Enable Notifications
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Receive real-time alerts and notifications
                      </p>
                    </div>
                    <Switch
                      checked={settings.enableNotifications}
                      onCheckedChange={(value) =>
                        handleSettingChange("enableNotifications", value)
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="alertThreshold" className="text-xs font-medium">
                        Alert Threshold (%)
                      </Label>
                      <span className="text-sm font-semibold text-primary">
                        {settings.alertThreshold}%
                      </span>
                    </div>
                    <Input
                      id="alertThreshold"
                      type="number"
                      min={0}
                      max={100}
                      value={settings.alertThreshold}
                      onChange={(e) =>
                        handleSettingChange(
                          "alertThreshold",
                          parseInt(e.target.value)
                        )
                      }
                      className="bg-secondary/50 border-primary/20 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      Trigger alerts when metrics exceed this threshold
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="display" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      Display Preferences
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Customize how the application looks
                    </p>
                  </div>
                  <Palette className="w-4 h-4 text-primary" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-primary/10">
                  <div>
                    <Label className="text-xs font-medium">Dark Mode</Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Use dark theme throughout the application
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableDarkMode}
                    onCheckedChange={(value) =>
                      handleSettingChange("enableDarkMode", value)
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      Performance Settings
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      Optimize application performance
                    </p>
                  </div>
                  <Zap className="w-4 h-4 text-primary" />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 border border-primary/10">
                    <div>
                      <Label className="text-xs font-medium">Auto Refresh</Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        Automatically refresh data at intervals
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoRefresh}
                      onCheckedChange={(value) =>
                        handleSettingChange("autoRefresh", value)
                      }
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="refreshInterval" className="text-xs font-medium">
                        Refresh Interval (seconds)
                      </Label>
                      <span className="text-sm font-semibold text-primary">
                        {settings.refreshInterval}s
                      </span>
                    </div>
                    <Input
                      id="refreshInterval"
                      type="number"
                      min={5}
                      max={300}
                      value={settings.refreshInterval}
                      onChange={(e) =>
                        handleSettingChange(
                          "refreshInterval",
                          parseInt(e.target.value)
                        )
                      }
                      className="bg-secondary/50 border-primary/20 focus:border-primary"
                    />
                    <p className="text-xs text-muted-foreground">
                      How often to fetch new data (minimum 5 seconds)
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-4"
          >
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Local Storage
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  All settings are saved locally in your browser and never sent
                  to servers.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4"
          >
            <div className="flex items-start gap-3">
              <Bell className="w-4 h-4 text-primary shrink-0 mt-1" />
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  Changes Detected
                </h4>
                <p className="text-xs text-muted-foreground mt-1">
                  {hasChanges
                    ? "Click Save to apply your settings changes."
                    : "No unsaved changes."}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 pt-4"
        >
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90"
          >
            <Save className="w-4 h-4" />
            Save Settings
          </Button>
          <Button
            onClick={handleReset}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </Button>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
