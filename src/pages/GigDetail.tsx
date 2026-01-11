import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BidCard, { Bid } from "@/components/gigs/BidCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, DollarSign, User, Clock, MessageSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Mock data
const mockGig = {
  id: "1",
  title: "Build a React Dashboard with Analytics",
  description: "Looking for an experienced React developer to build a comprehensive analytics dashboard with charts, tables, and real-time data updates. The dashboard should include:\n\n- Interactive charts and graphs\n- Data tables with sorting and filtering\n- Real-time data updates\n- Export functionality (PDF, CSV)\n- Responsive design for all devices\n\nIdeal candidate has 3+ years of React experience and familiarity with charting libraries like Recharts or Chart.js.",
  budget: 1500,
  status: "open" as const,
  ownerName: "Sarah Chen",
  ownerId: "owner-123",
  createdAt: "2 hours ago",
};

const mockBids: Bid[] = [
  {
    id: "bid-1",
    freelancerName: "John Developer",
    message: "I have 5 years of experience building React dashboards with Recharts. I can deliver this project in 2 weeks with all features requested. My portfolio includes similar projects for Fortune 500 companies.",
    price: 1400,
    status: "pending",
    createdAt: "1 hour ago",
  },
  {
    id: "bid-2",
    freelancerName: "Maria Designer",
    message: "Full-stack developer with expertise in React and data visualization. I'll create a beautiful, performant dashboard with real-time capabilities. Happy to discuss the project in detail.",
    price: 1300,
    status: "pending",
    createdAt: "30 minutes ago",
  },
];

const GigDetail = () => {
  const { id } = useParams();
  const [bids, setBids] = useState<Bid[]>(mockBids);
  const [gigStatus, setGigStatus] = useState<"open" | "assigned">(mockGig.status);
  const [bidMessage, setBidMessage] = useState("");
  const [bidPrice, setBidPrice] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hiringBidId, setHiringBidId] = useState<string | null>(null);

  // For demo purposes, let's assume the current user is NOT the owner
  const isOwner = false; // Toggle this to true to see owner view
  const isOpen = gigStatus === "open";

  const handleSubmitBid = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bidMessage.trim() || !bidPrice) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newBid: Bid = {
      id: `bid-${Date.now()}`,
      freelancerName: "You",
      message: bidMessage,
      price: parseFloat(bidPrice),
      status: "pending",
      createdAt: "Just now",
    };

    setBids([newBid, ...bids]);
    setBidMessage("");
    setBidPrice("");
    setIsSubmitting(false);

    toast({
      title: "Bid submitted!",
      description: "Your proposal has been sent to the client.",
    });
  };

  const handleHire = async (bidId: string) => {
    setHiringBidId(bidId);

    // Simulate API call with the hiring logic
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update bids: hired bid gets "hired" status, others get "rejected"
    setBids(prevBids => 
      prevBids.map(bid => ({
        ...bid,
        status: bid.id === bidId ? "hired" : "rejected",
      }))
    );

    // Update gig status to assigned
    setGigStatus("assigned");
    setHiringBidId(null);

    toast({
      title: "Freelancer hired!",
      description: "The freelancer has been notified of your decision.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          {/* Back Button */}
          <Link to="/gigs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Gigs
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gig Header */}
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <Badge className={isOpen ? "bg-success/10 text-success border-success/20" : "bg-muted"}>
                    {isOpen ? "Open for Bids" : "Assigned"}
                  </Badge>
                </div>

                <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">{mockGig.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    <span>Posted by {mockGig.ownerName}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    <span>{mockGig.createdAt}</span>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                  {mockGig.description}
                </div>
              </div>

              {/* Bids Section */}
              <div className="p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-accent" />
                    Proposals ({bids.length})
                  </h2>
                </div>

                {bids.length > 0 ? (
                  <div className="space-y-4">
                    {bids.map((bid) => (
                      <BidCard 
                        key={bid.id} 
                        bid={bid} 
                        isOwner={isOwner}
                        onHire={handleHire}
                        isHiring={hiringBidId === bid.id}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <MessageSquare className="h-10 w-10 mx-auto mb-3 opacity-50" />
                    <p>No proposals yet. Be the first to bid!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Budget Card */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Budget</h3>
                <div className="flex items-center gap-2 text-3xl font-bold">
                  <DollarSign className="h-7 w-7 text-accent" />
                  {mockGig.budget}
                </div>
              </div>

              {/* Submit Bid Form */}
              {isOpen && !isOwner && (
                <div className="p-6 rounded-2xl bg-card border border-border shadow-card">
                  <h3 className="font-display text-lg font-semibold mb-4">Submit Your Proposal</h3>
                  
                  <form onSubmit={handleSubmitBid} className="space-y-4">
                    <div>
                      <Label htmlFor="bid-price">Your Price ($)</Label>
                      <Input
                        id="bid-price"
                        type="number"
                        placeholder="Enter your price"
                        value={bidPrice}
                        onChange={(e) => setBidPrice(e.target.value)}
                        required
                        min="1"
                        className="mt-1.5"
                      />
                    </div>

                    <div>
                      <Label htmlFor="bid-message">Cover Letter</Label>
                      <Textarea
                        id="bid-message"
                        placeholder="Describe why you're the best fit for this project..."
                        value={bidMessage}
                        onChange={(e) => setBidMessage(e.target.value)}
                        required
                        rows={5}
                        className="mt-1.5 resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      variant="accent" 
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Proposal"}
                    </Button>
                  </form>
                </div>
              )}

              {/* Owner Notice */}
              {isOwner && (
                <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20">
                  <h3 className="font-semibold mb-2">This is your gig</h3>
                  <p className="text-sm text-muted-foreground">
                    Review the proposals above and click "Hire" on the freelancer you'd like to work with.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GigDetail;
