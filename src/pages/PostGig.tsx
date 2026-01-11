import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Briefcase, DollarSign, FileText, ArrowRight } from "lucide-react";

const PostGig = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Gig posted successfully!",
      description: "Freelancers can now see and bid on your project.",
    });

    setIsSubmitting(false);
    navigate("/gigs");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl gradient-accent mb-4">
              <Briefcase className="h-7 w-7 text-accent-foreground" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">Post a New Gig</h1>
            <p className="text-muted-foreground text-lg">
              Describe your project and find the perfect freelancer
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 rounded-2xl bg-card border border-border shadow-card">
            <div>
              <Label htmlFor="title" className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-accent" />
                Job Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Build a React Dashboard with Analytics"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={100}
                className="text-base"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Be specific and descriptive (max 100 characters)
              </p>
            </div>

            <div>
              <Label htmlFor="description" className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-accent" />
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your project in detail. Include requirements, skills needed, timeline expectations, and any other relevant information..."
                value={formData.description}
                onChange={handleChange}
                required
                rows={8}
                className="resize-none text-base"
                maxLength={2000}
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                {formData.description.length}/2000 characters
              </p>
            </div>

            <div>
              <Label htmlFor="budget" className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-accent" />
                Budget (USD)
              </Label>
              <Input
                id="budget"
                name="budget"
                type="number"
                placeholder="Enter your budget"
                value={formData.budget}
                onChange={handleChange}
                required
                min="10"
                max="100000"
                className="text-base"
              />
              <p className="text-xs text-muted-foreground mt-1.5">
                Set a realistic budget to attract quality proposals
              </p>
            </div>

            <div className="pt-4">
              <Button 
                type="submit" 
                variant="accent" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Posting..."
                ) : (
                  <>
                    Post Gig
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-8 p-6 rounded-xl bg-muted/50 border border-border">
            <h3 className="font-display font-semibold mb-3">Tips for a great job post</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                Be clear about deliverables and expectations
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                Include any specific skills or technologies required
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                Mention your timeline or deadline if applicable
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">•</span>
                Set a competitive budget to attract quality freelancers
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PostGig;
