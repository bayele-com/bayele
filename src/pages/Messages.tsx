import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

const Messages = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Card className="p-6">
          <p className="text-gray-500">Messages page content coming soon...</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;