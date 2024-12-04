import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SearchCommandProps {
  onSelect: (value: string) => void;
}

interface Neighborhood {
  id: string;
  name: string;
  city: string;
}

export function SearchCommand({ onSelect }: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [neighborhoods, setNeighborhoods] = useState<Neighborhood[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchNeighborhoods = async () => {
      const { data, error } = await supabase
        .from('neighborhoods')
        .select('id, name, city')
        .order('name');

      if (error) {
        toast({
          variant: "destructive",
          title: "Error fetching neighborhoods",
          description: "Please try again later",
        });
        return;
      }

      setNeighborhoods(data);
    };

    fetchNeighborhoods();
  }, [toast]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative w-full flex items-center"
      >
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          className="w-full h-10 pl-9 pr-4 rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Search by location..."
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          readOnly
        />
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Search neighborhoods..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Neighborhoods">
              {neighborhoods.map((neighborhood) => (
                <CommandItem
                  key={neighborhood.id}
                  value={neighborhood.name}
                  onSelect={(value) => {
                    onSelect(value);
                    setOpen(false);
                  }}
                >
                  {neighborhood.name} ({neighborhood.city})
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}