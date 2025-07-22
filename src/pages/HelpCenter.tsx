import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Phone, Mail, MessageCircle, FileText, CreditCard, Car, Home } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const faqCategories = [
  {
    title: "Claims",
    icon: FileText,
    questions: [
      "How do I file a claim?",
      "What documents do I need?",
      "How long does claim processing take?",
      "Can I track my claim online?"
    ]
  },
  {
    title: "Auto Insurance",
    icon: Car,
    questions: [
      "What's covered under collision?",
      "Do I need comprehensive coverage?",
      "How are premiums calculated?",
      "What's my deductible?"
    ]
  },
  {
    title: "Billing & Payments",
    icon: CreditCard,
    questions: [
      "How do I make a payment?",
      "Can I change my payment method?",
      "When is my payment due?",
      "What if I miss a payment?"
    ]
  },
  {
    title: "Policy Management",
    icon: Home,
    questions: [
      "How do I update my policy?",
      "Can I add a driver?",
      "How do I cancel my policy?",
      "What are my coverage limits?"
    ]
  }
];

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak with our support team",
    contact: "1-800-AUTOSURE",
    availability: "24/7 for claims, Mon-Fri 8AM-8PM for general support"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with an AI agent",
    contact: "Start Chat",
    availability: "Available 24/7"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a message",
    contact: "support@autosure.ai",
    availability: "Response within 24 hours"
  }
];

const HelpCenter = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">How can we help you today?</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                placeholder="Search for help articles, FAQs, or topics..."
                className="pl-12 py-6 text-lg"
              />
              <Button className="absolute right-2 top-2">
                Search
              </Button>
            </div>
          </div>
          
          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <method.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">{method.title}</h3>
                <p className="text-muted-foreground mb-4">{method.description}</p>
                <div className="font-semibold text-primary mb-2">{method.contact}</div>
                <p className="text-sm text-muted-foreground">{method.availability}</p>
                <Button className="w-full mt-4" variant="outline">
                  {method.title === "Live Chat" ? "Start Chat" : "Contact"}
                </Button>
              </Card>
            ))}
          </div>
          
          {/* FAQ Categories */}
          <div>
            <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {faqCategories.map((category, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center mb-4">
                    <category.icon className="h-6 w-6 text-primary mr-3" />
                    <h3 className="font-semibold text-lg">{category.title}</h3>
                  </div>
                  <div className="space-y-3">
                    {category.questions.map((question, qIndex) => (
                      <div key={qIndex}>
                        <button className="text-left w-full p-3 rounded-lg hover:bg-muted transition-colors">
                          <p className="font-medium text-foreground">{question}</p>
                        </button>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Emergency Claims */}
          <Card className="mt-12 p-8 bg-destructive/5 border-destructive/20">
            <div className="text-center">
              <h3 className="text-xl font-bold text-destructive mb-2">Emergency Claims</h3>
              <p className="text-muted-foreground mb-4">
                If you're in an emergency situation or need immediate assistance with a claim
              </p>
              <Button variant="destructive" size="lg" className="mr-4">
                <Phone className="h-4 w-4 mr-2" />
                Call Emergency Line: 1-800-EMERGENCY
              </Button>
              <Button variant="outline" size="lg">
                Report Emergency Claim Online
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;