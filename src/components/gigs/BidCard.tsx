import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DollarSign, User } from "lucide-react";

export interface Bid {
  id: string;
  freelancerName: string;
  message: string;
  price: number;
  status: "pending" | "hired" | "rejected";
  createdAt: string;
}

interface BidCardProps {
  bid: Bid;
  isOwner: boolean;
  onHire?: (bidId: string) => void;
  isHiring?: boolean;
}

const BidCard = ({ bid, isOwner, onHire, isHiring }: BidCardProps) => {
  const getStatusBadge = () => {
    switch (bid.status) {
      case "hired":
        return <Badge className="bg-success/10 text-success border-success/20">Hired</Badge>;
      case "rejected":
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">Not Selected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className={`p-5 rounded-xl border transition-all duration-200 ${
      bid.status === "hired" 
        ? "bg-success/5 border-success/30" 
        : bid.status === "rejected"
        ? "bg-muted/50 border-border opacity-60"
        : "bg-card border-border hover:border-accent/30"
    }`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
            <User className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h4 className="font-medium text-foreground">{bid.freelancerName}</h4>
            <p className="text-sm text-muted-foreground">{bid.createdAt}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <p className="text-muted-foreground text-sm mb-4">{bid.message}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-lg font-semibold">
          <DollarSign className="h-5 w-5 text-accent" />
          <span>{bid.price}</span>
        </div>

        {isOwner && bid.status === "pending" && onHire && (
          <Button 
            variant="success" 
            size="sm"
            onClick={() => onHire(bid.id)}
            disabled={isHiring}
          >
            {isHiring ? "Hiring..." : "Hire"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default BidCard;
