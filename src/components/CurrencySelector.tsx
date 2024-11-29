import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/contexts/CurrencyContext";

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setCurrency('XAF')}>
          XAF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCurrency('USD')}>
          USD
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}