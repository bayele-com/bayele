import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const RecentActivity = () => {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;