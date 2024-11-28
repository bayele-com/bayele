import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const Messages = () => {
  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Messages</h1>
        <Card className="p-8 text-center">
          <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
          <p className="text-lg text-gray-500">Your messages will appear here</p>
          <p className="text-sm text-gray-400 mt-2">
            Start a conversation with buyers or sellers
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Messages;