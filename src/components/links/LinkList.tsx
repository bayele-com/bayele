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
      description: string;
      price: number;
      commission_rate: number;
      image_urls: string[];
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
    <div className="space-y-6">
      {links.map((link) => (
        <div key={link.id} className="bg-white rounded-lg shadow">
          <div className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-32 h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                {link.product.image_urls?.[0] ? (
                  <img
                    src={link.product.image_urls[0]}
                    alt={link.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <ExternalLink className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{link.product.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Commission: {link.product.commission_rate}%
                    </p>
                  </div>
                  <Badge variant={link.status === "active" ? "default" : "secondary"}>
                    {link.status}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {link.product.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Created {format(new Date(link.created_at), "MMM d, yyyy")}
                    </p>
                    <div className="flex gap-4">
                      <span className="text-sm text-muted-foreground">
                        {link.analytics.clicks} clicks
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {link.analytics.conversions} conversions
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(link.unique_code)}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => 
                        window.open(`/ref/${link.unique_code}`, "_blank")
                      }
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LinkList;