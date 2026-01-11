import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Briefcase, DollarSign, Users, Zap, Shield, Clock } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Briefcase,
      title: "Post Jobs Easily",
      description: "Create detailed job listings in minutes and reach talented freelancers worldwide.",
    },
    {
      icon: Users,
      title: "Find Top Talent",
      description: "Browse proposals from skilled professionals and hire the perfect match for your project.",
    },
    {
      icon: DollarSign,
      title: "Secure Payments",
      description: "Set your budget upfront and only pay when you're satisfied with the work.",
    },
  ];

  const stats = [
    { value: "10K+", label: "Active Freelancers" },
    { value: "5K+", label: "Projects Completed" },
    { value: "98%", label: "Client Satisfaction" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden gradient-hero py-20 md:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent-foreground mb-6 animate-fade-in">
                <Zap className="h-4 w-4" />
                <span className="text-sm font-medium">The Future of Freelancing</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                Find talent.
                <br />
                <span className="text-gradient">Get hired.</span>
              </h1>
              
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                Connect with skilled freelancers or find your next big opportunity. 
                GigFlow makes hiring and working simple, fast, and secure.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <Link to="/gigs">
                  <Button variant="accent" size="xl">
                    Browse Gigs
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/post-gig">
                  <Button variant="outline" size="xl" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Post a Job
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-16 md:mt-24 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-28 bg-background">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                Everything you need to succeed
              </h2>
              <p className="text-muted-foreground text-lg">
                Whether you're hiring or looking for work, GigFlow has the tools to help you thrive.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={feature.title} 
                  className="p-8 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-12 w-12 rounded-xl gradient-accent flex items-center justify-center mb-5">
                    <feature.icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-20 md:py-28 bg-muted/30">
          <div className="container">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                How GigFlow works
              </h2>
              <p className="text-muted-foreground text-lg">
                Get started in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connection line - desktop only */}
              <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-accent via-accent to-accent/30" />
              
              {[
                { step: "01", title: "Create Account", description: "Sign up for free and complete your profile in minutes.", icon: Users },
                { step: "02", title: "Post or Browse", description: "Post a job or browse available opportunities.", icon: Briefcase },
                { step: "03", title: "Start Working", description: "Connect with the right match and start collaborating.", icon: Zap },
              ].map((item, index) => (
                <div key={item.step} className="relative text-center">
                  <div className="relative z-10 h-16 w-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6 shadow-elevated">
                    <item.icon className="h-7 w-7 text-accent-foreground" />
                  </div>
                  <div className="text-sm font-medium text-accent mb-2">Step {item.step}</div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="rounded-3xl gradient-hero p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
              
              <div className="relative">
                <h2 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
                  Ready to get started?
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                  Join thousands of freelancers and clients who trust GigFlow for their projects.
                </p>
                <Link to="/signup">
                  <Button variant="accent" size="xl">
                    Create Free Account
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
