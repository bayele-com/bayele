import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface LinkListProps {
  links: Array<{
    id: string;
    unique_code: string;
    status: string;
    created_at: string;
    product: {
      name: string;
      price: number;
      commission_rate: number;
    };
    analytics: {
      clicks: number;
      conversions: number;
    };
  }>;
}

const LinkList = ({ links }: LinkListProps) => {
  const { toast } = useToast();

  const copyToClipboard = async (code: string) => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/ref/${code}`
      );
      toast({
        title: "Link copied",
        description: "The affiliate link has been copied to your clipboard",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to copy",
        description: "Please try again",
      });
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Performance</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((link) => (
            <TableRow key={link.id}>
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span>{link.product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    Commission: {link.product.commission_rate}%
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {format(new Date(link.created_at), "MMM d, yyyy")}
              </TableCell>
              <TableCell>
                <Badge
                  variant={link.status === "active" ? "default" : "secondary"}
                >
                  {link.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span>{link.analytics.clicks} clicks</span>
                  <span className="text-sm text-muted-foreground">
                    {link.analytics.conversions} conversions
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(link.unique_code)}
                    className="h-8 w-8"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => 
                      window.open(`/ref/${link.unique_code}`, "_blank")
                    }
                    className="h-8 w-8"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LinkList;