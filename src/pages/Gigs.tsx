import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GigCard, { Gig } from "@/components/gigs/GigCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter } from "lucide-react";

// Mock data for demo
const mockGigs: Gig[] = [
  {
    id: "1",
    title: "Build a React Dashboard with Analytics",
    description: "Looking for an experienced React developer to build a comprehensive analytics dashboard with charts, tables, and real-time data updates.",
    budget: 1500,
    status: "open",
    ownerName: "Sarah Chen",
    createdAt: "2 hours ago",
    bidsCount: 5,
  },
  {
    id: "2",
    title: "Mobile App UI/UX Design",
    description: "Need a talented designer to create modern, user-friendly interfaces for a fitness tracking mobile application. Must have experience with Figma.",
    budget: 800,
    status: "open",
    ownerName: "Marcus Johnson",
    createdAt: "5 hours ago",
    bidsCount: 12,
  },
  {
    id: "3",
    title: "WordPress E-commerce Setup",
    description: "Looking for WordPress expert to set up WooCommerce store with payment integration, inventory management, and custom theme.",
    budget: 600,
    status: "open",
    ownerName: "Emily Rodriguez",
    createdAt: "1 day ago",
    bidsCount: 8,
  },
  {
    id: "4",
    title: "API Integration Specialist",
    description: "Need someone to integrate multiple third-party APIs including Stripe, SendGrid, and Twilio into our Node.js backend.",
    budget: 1200,
    status: "open",
    ownerName: "David Kim",
    createdAt: "1 day ago",
    bidsCount: 3,
  },
  {
    id: "5",
    title: "Logo and Brand Identity Design",
    description: "Startup looking for creative designer to develop complete brand identity including logo, color palette, and brand guidelines.",
    budget: 500,
    status: "assigned",
    ownerName: "Alex Thompson",
    createdAt: "3 days ago",
    bidsCount: 15,
  },
  {
    id: "6",
    title: "Python Data Analysis Script",
    description: "Need a Python developer to create scripts for analyzing large datasets and generating automated reports in PDF format.",
    budget: 400,
    status: "open",
    ownerName: "Jennifer Lee",
    createdAt: "4 hours ago",
    bidsCount: 2,
  },
];

const Gigs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOpenOnly, setShowOpenOnly] = useState(true);

  const filteredGigs = mockGigs.filter((gig) => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          gig.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = showOpenOnly ? gig.status === "open" : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Browse Gigs</h1>
              <p className="text-muted-foreground">Find your next opportunity from our open positions</p>
            </div>
            <Link to="/post-gig">
              <Button variant="accent">
                <Plus className="h-4 w-4" />
                Post a Job
              </Button>
            </Link>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gigs by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant={showOpenOnly ? "default" : "outline"}
              onClick={() => setShowOpenOnly(!showOpenOnly)}
              className="shrink-0"
            >
              <Filter className="h-4 w-4" />
              {showOpenOnly ? "Open Only" : "All Gigs"}
            </Button>
          </div>

          {/* Results Count */}
          <p className="text-sm text-muted-foreground mb-6">
            Showing <span className="font-medium text-foreground">{filteredGigs.length}</span> gig{filteredGigs.length !== 1 ? "s" : ""}
          </p>

          {/* Gigs Grid */}
          {filteredGigs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGigs.map((gig, index) => (
                <div 
                  key={gig.id} 
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <GigCard gig={gig} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">No gigs found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setShowOpenOnly(true); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Gigs;
