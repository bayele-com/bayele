import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Card className="p-6">
          <p className="text-gray-500">Settings page content coming soon...</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;