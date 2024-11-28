import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Card className="p-8 text-center">
          <SettingsIcon className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-500">Account settings will appear here</p>
          <p className="text-sm text-gray-400 mt-2">
            Manage your profile, notifications, and preferences
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;