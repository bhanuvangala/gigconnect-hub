import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, FileText, DollarSign, Clock, Plus, ArrowRight, Bell } from "lucide-react";

// Mock data
const myGigs = [
  {
    id: "1",
    title: "Build a React Dashboard",
    budget: 1500,
    status: "open",
    bidsCount: 5,
    createdAt: "2 days ago",
  },
  {
    id: "2",
    title: "Mobile App UI Design",
    budget: 800,
    status: "assigned",
    bidsCount: 12,
    createdAt: "5 days ago",
  },
];

const myBids = [
  {
    id: "bid-1",
    gigTitle: "E-commerce Website Development",
    bidAmount: 2000,
    status: "pending",
    submittedAt: "1 day ago",
  },
  {
    id: "bid-2",
    gigTitle: "Logo Design for Tech Startup",
    bidAmount: 300,
    status: "hired",
    submittedAt: "3 days ago",
  },
  {
    id: "bid-3",
    gigTitle: "WordPress Blog Setup",
    bidAmount: 150,
    status: "rejected",
    submittedAt: "1 week ago",
  },
];

const notifications = [
  {
    id: "1",
    message: "You have been hired for 'Logo Design for Tech Startup'!",
    time: "2 hours ago",
    isNew: true,
  },
  {
    id: "2",
    message: "New bid received on 'Build a React Dashboard'",
    time: "5 hours ago",
    isNew: true,
  },
  {
    id: "3",
    message: "Your bid on 'WordPress Blog Setup' was not selected",
    time: "1 day ago",
    isNew: false,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Active Gigs", value: myGigs.filter(g => g.status === "open").length, icon: Briefcase },
    { label: "Total Bids", value: myBids.length, icon: FileText },
    { label: "Hired", value: myBids.filter(b => b.status === "hired").length, icon: DollarSign },
    { label: "Pending", value: myBids.filter(b => b.status === "pending").length, icon: Clock },
  ];

  const getBidStatusBadge = (status: string) => {
    switch (status) {
      case "hired":
        return <Badge className="bg-success/10 text-success border-success/20">Hired</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Not Selected</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's an overview of your activity.</p>
            </div>
            <Link to="/post-gig">
              <Button variant="accent">
                <Plus className="h-4 w-4" />
                Post New Gig
              </Button>
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat) => (
              <div 
                key={stat.label}
                className="p-5 rounded-xl bg-card border border-border shadow-card"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <stat.icon className="h-5 w-5 text-accent" />
                  </div>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-muted/50 p-1">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="my-gigs">My Gigs</TabsTrigger>
              <TabsTrigger value="my-bids">My Bids</TabsTrigger>
              <TabsTrigger value="notifications" className="relative">
                Notifications
                {notifications.some(n => n.isNew) && (
                  <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-accent" />
                )}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Gigs */}
                <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg font-semibold">Recent Gigs</h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("my-gigs")}>
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {myGigs.slice(0, 3).map((gig) => (
                      <Link 
                        key={gig.id}
                        to={`/gigs/${gig.id}`}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div>
                          <p className="font-medium line-clamp-1">{gig.title}</p>
                          <p className="text-sm text-muted-foreground">{gig.bidsCount} bids • ${gig.budget}</p>
                        </div>
                        <Badge variant={gig.status === "open" ? "default" : "secondary"} className={gig.status === "open" ? "bg-success/10 text-success border-success/20" : ""}>
                          {gig.status === "open" ? "Open" : "Assigned"}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Recent Notifications */}
                <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-display text-lg font-semibold flex items-center gap-2">
                      <Bell className="h-5 w-5" />
                      Notifications
                    </h2>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab("notifications")}>
                      View All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {notifications.slice(0, 3).map((notif) => (
                      <div 
                        key={notif.id}
                        className={`p-3 rounded-lg ${notif.isNew ? "bg-accent/5 border border-accent/20" : "bg-muted/30"}`}
                      >
                        <p className="text-sm">{notif.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* My Gigs Tab */}
            <TabsContent value="my-gigs">
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-lg font-semibold">Your Posted Gigs</h2>
                  <Link to="/post-gig">
                    <Button variant="accent" size="sm">
                      <Plus className="h-4 w-4" />
                      New Gig
                    </Button>
                  </Link>
                </div>
                
                {myGigs.length > 0 ? (
                  <div className="space-y-4">
                    {myGigs.map((gig) => (
                      <Link 
                        key={gig.id}
                        to={`/gigs/${gig.id}`}
                        className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent/30 hover:shadow-card transition-all"
                      >
                        <div>
                          <h3 className="font-medium mb-1">{gig.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>${gig.budget}</span>
                            <span>{gig.bidsCount} bids</span>
                            <span>{gig.createdAt}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={gig.status === "open" ? "default" : "secondary"} className={gig.status === "open" ? "bg-success/10 text-success border-success/20" : ""}>
                            {gig.status === "open" ? "Open" : "Assigned"}
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Briefcase className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">You haven't posted any gigs yet</p>
                    <Link to="/post-gig">
                      <Button variant="accent">Post Your First Gig</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* My Bids Tab */}
            <TabsContent value="my-bids">
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <h2 className="font-display text-lg font-semibold mb-6">Your Proposals</h2>
                
                {myBids.length > 0 ? (
                  <div className="space-y-4">
                    {myBids.map((bid) => (
                      <div 
                        key={bid.id}
                        className={`p-4 rounded-xl border transition-all ${
                          bid.status === "hired" 
                            ? "bg-success/5 border-success/30" 
                            : bid.status === "rejected"
                            ? "bg-muted/50 border-border opacity-60"
                            : "border-border"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium mb-1">{bid.gigTitle}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span className="font-medium text-foreground">${bid.bidAmount}</span>
                              <span>{bid.submittedAt}</span>
                            </div>
                          </div>
                          {getBidStatusBadge(bid.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">You haven't submitted any bids yet</p>
                    <Link to="/gigs">
                      <Button variant="accent">Browse Gigs</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <div className="p-6 rounded-xl bg-card border border-border shadow-card">
                <h2 className="font-display text-lg font-semibold mb-6">All Notifications</h2>
                
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div 
                      key={notif.id}
                      className={`p-4 rounded-xl ${notif.isNew ? "bg-accent/5 border border-accent/20" : "bg-muted/30 border border-transparent"}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`h-2 w-2 rounded-full mt-2 ${notif.isNew ? "bg-accent" : "bg-muted-foreground/30"}`} />
                        <div>
                          <p className="text-sm">{notif.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
