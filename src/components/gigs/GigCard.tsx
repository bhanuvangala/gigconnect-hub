import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, User } from "lucide-react";

export interface Gig {
  id: string;
  title: string;
  description: string;
  budget: number;
  status: "open" | "assigned";
  ownerName: string;
  createdAt: string;
  bidsCount: number;
}

interface GigCardProps {
  gig: Gig;
}

const GigCard = ({ gig }: GigCardProps) => {
  const isOpen = gig.status === "open";

  return (
    <Link to={`/gigs/${gig.id}`}>
      <article className="group p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-start justify-between gap-4 mb-3">
          <h3 className="font-display font-semibold text-lg text-foreground group-hover:text-accent transition-colors line-clamp-1">
            {gig.title}
          </h3>
          <Badge variant={isOpen ? "default" : "secondary"} className={isOpen ? "bg-success/10 text-success border-success/20" : ""}>
            {isOpen ? "Open" : "Assigned"}
          </Badge>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {gig.description}
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-accent" />
            <span className="font-medium text-foreground">${gig.budget}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-4 w-4" />
            <span>{gig.ownerName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{gig.createdAt}</span>
          </div>
        </div>

        {isOpen && gig.bidsCount > 0 && (
          <div className="mt-4 pt-4 border-t border-border">
            <span className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{gig.bidsCount}</span> bid{gig.bidsCount !== 1 ? "s" : ""} received
            </span>
          </div>
        )}
      </article>
    </Link>
  );
};

export default GigCard;
