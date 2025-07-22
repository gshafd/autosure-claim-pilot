import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Camera, 
  Bot,
  Users,
  DollarSign,
  Phone
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import heroImage from "@/assets/hero-insurance.jpg";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Processing",
    description: "Our advanced AI agents process claims 10x faster than traditional methods"
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Report and track claims anytime, anywhere with instant AI assistance"
  },
  {
    icon: Shield,
    title: "Secure & Trusted",
    description: "Bank-level security with complete transparency in our decision process"
  }
];

const stats = [
  { label: "Claims Processed", value: "50,000+", icon: FileText },
  { label: "Average Processing Time", value: "2.3 hours", icon: Clock },
  { label: "Customer Satisfaction", value: "98%", icon: Users },
  { label: "Total Payouts", value: "$25M+", icon: DollarSign }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  AI-Powered Insurance Claims
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Claims Processing{" "}
                  <span className="bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
                    Reimagined
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Submit your auto insurance claim in minutes and get instant AI-powered processing. 
                  Fast, transparent, and available 24/7.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/report-claim">
                  <Button size="lg" variant="hero" className="text-lg py-6 px-8">
                    Report a Claim Now
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/track-claim">
                  <Button size="lg" variant="outline" className="text-lg py-6 px-8">
                    Track Existing Claim
                  </Button>
                </Link>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>No paperwork required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span>AI processing in minutes</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
              <img 
                src={heroImage} 
                alt="Family with their car protected by AutoSure AI"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              The Future of Insurance Claims
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI agents work around the clock to process your claims with unprecedented speed and accuracy.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
          
          {/* Process Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="p-6 border-l-4 border-l-primary">
              <div className="flex items-center gap-3 mb-4">
                <Camera className="h-6 w-6 text-primary" />
                <h3 className="font-semibold">1. Upload Evidence</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Simply upload photos of damage, police reports, and any relevant documents. Our AI understands it all.
              </p>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-accent">
              <div className="flex items-center gap-3 mb-4">
                <Bot className="h-6 w-6 text-accent" />
                <h3 className="font-semibold">2. AI Analysis</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Our AI agents instantly analyze your claim, verify coverage, and calculate fair compensation.
              </p>
            </Card>
            
            <Card className="p-6 border-l-4 border-l-success">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="h-6 w-6 text-success" />
                <h3 className="font-semibold">3. Instant Decision</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get approved and receive payment in hours, not weeks. Complete transparency every step.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who've already experienced lightning-fast claim processing with AutoSure AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/report-claim">
              <Button size="lg" variant="outline" className="bg-white text-primary hover:bg-white/90 border-white">
                Start Your Claim
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/workflow">
              <Button size="lg" variant="ghost" className="text-white border-white hover:bg-white/10">
                See How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-primary to-primary-dark rounded-lg">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-foreground">AutoSure Claims AI</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Revolutionizing insurance claims with AI-powered processing. Fast, fair, and transparent.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>24/7 Support: 1-800-AUTOSURE</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Services</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <Link to="/report-claim" className="block hover:text-primary">Report a Claim</Link>
                <Link to="/track-claim" className="block hover:text-primary">Track Claim</Link>
                <Link to="/help-center" className="block hover:text-primary">Help Center</Link>
                <Link to="/workflow" className="block hover:text-primary">How It Works</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <a href="#" className="block hover:text-primary">About Us</a>
                <a href="#" className="block hover:text-primary">Privacy Policy</a>
                <a href="#" className="block hover:text-primary">Terms of Service</a>
                <Link to="/dashboard" className="block hover:text-primary">Agent Portal</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 AutoSure Claims AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
