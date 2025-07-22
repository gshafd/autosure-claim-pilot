import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock, 
  Download, 
  FileText, 
  Image, 
  AlertTriangle,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Car
} from "lucide-react";
import damageImage1 from "@/assets/damage-sample-1.jpg";
import damageImage2 from "@/assets/damage-sample-2.jpg";

const claimData = {
  id: "AS-2024-001234",
  status: "AI Processing",
  claimant: {
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "(555) 123-4567",
    policyNumber: "AS-POL-789456"
  },
  incident: {
    date: "2024-01-15",
    time: "14:30",
    location: "123 Main St, Springfield, IL",
    description: "Rear-ended at a stop light. Minor damage to rear bumper."
  },
  estimate: {
    amount: "$1,850",
    breakdown: {
      parts: "$1,200",
      labor: "$650"
    }
  },
  aiProcessing: [
    { step: "Policy Lookup", status: "completed", confidence: 100, details: "Policy found and active" },
    { step: "Coverage Check", status: "completed", confidence: 98, details: "Collision + Comprehensive valid" },
    { step: "Damage Classifier", status: "completed", confidence: 92, details: "Rear bumper crack detected" },
    { step: "Repair Estimate Match", status: "completed", confidence: 89, details: "Match found in local DB" },
    { step: "Payout Recommendation", status: "processing", confidence: 85, details: "Calculating final amount..." },
    { step: "Email Notification", status: "pending", confidence: 0, details: "Waiting for approval" }
  ]
};

const ClaimDetails = () => {
  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-5 w-5 text-success" />;
      case "processing": return <Clock className="h-5 w-5 text-primary animate-spin" />;
      default: return <AlertTriangle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "AI Processing": return "secondary";
      case "Approved": return "success";
      case "Investigation Required": return "destructive";
      default: return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Claim Details</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-muted-foreground">{claimData.id}</span>
              <Badge variant={getStatusColor(claimData.status) as any}>
                {claimData.status}
              </Badge>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Override AI Decision</Button>
            <Button variant="outline">Request Manual Review</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Documents */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Uploaded Documents</h3>
              <Tabs defaultValue="images" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="images">Damage Photos</TabsTrigger>
                  <TabsTrigger value="police">Police Report</TabsTrigger>
                  <TabsTrigger value="invoices">Invoices</TabsTrigger>
                </TabsList>
                
                <TabsContent value="images" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={damageImage1} 
                        alt="Rear bumper damage" 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <p className="font-medium">Rear Bumper Damage</p>
                        <p className="text-sm text-muted-foreground">Uploaded: Jan 15, 2024</p>
                      </div>
                    </div>
                    <div className="border rounded-lg overflow-hidden">
                      <img 
                        src={damageImage2} 
                        alt="Side panel damage" 
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-3">
                        <p className="font-medium">Overall View</p>
                        <p className="text-sm text-muted-foreground">Uploaded: Jan 15, 2024</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="police" className="mt-4">
                  <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="font-medium mb-2">Police Report</h4>
                    <p className="text-sm text-muted-foreground mb-4">report_20240115.pdf</p>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="invoices" className="mt-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Towing Receipt</p>
                          <p className="text-sm text-muted-foreground">towing_receipt.pdf</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Repair Estimate</p>
                          <p className="text-sm text-muted-foreground">estimate_autopart.pdf</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Claim Information */}
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Claim Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Claimant</p>
                      <p className="text-sm text-muted-foreground">{claimData.claimant.name}</p>
                      <p className="text-sm text-muted-foreground">{claimData.claimant.email}</p>
                      <p className="text-sm text-muted-foreground">{claimData.claimant.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Car className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Policy</p>
                      <p className="text-sm text-muted-foreground">{claimData.claimant.policyNumber}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Incident Date & Time</p>
                      <p className="text-sm text-muted-foreground">{claimData.incident.date} at {claimData.incident.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-sm text-muted-foreground">{claimData.incident.location}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t">
                <p className="font-medium mb-2">Description</p>
                <p className="text-sm text-muted-foreground">{claimData.incident.description}</p>
              </div>
            </Card>
          </div>

          {/* Right Panel - AI Processing */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">AI Agent Processing</h3>
              <div className="space-y-4">
                {claimData.aiProcessing.map((step, index) => (
                  <div key={index} className="flex items-start gap-3">
                    {getStepIcon(step.status)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{step.step}</p>
                        {step.confidence > 0 && (
                          <span className="text-xs text-muted-foreground">{step.confidence}%</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{step.details}</p>
                      {step.confidence > 0 && (
                        <Progress 
                          value={step.confidence} 
                          className="h-1 mt-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Estimated Payout</h3>
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <span className="text-3xl font-bold text-primary">{claimData.estimate.amount}</span>
                </div>
                <p className="text-sm text-muted-foreground">Total Estimated Amount</p>
              </div>
              
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Parts & Materials:</span>
                  <span className="font-medium">{claimData.estimate.breakdown.parts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Labor:</span>
                  <span className="font-medium">{claimData.estimate.breakdown.labor}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary-light border-primary/20">
              <h4 className="font-semibold mb-2">AI Recommendation</h4>
              <p className="text-sm mb-4">
                Based on the analysis, this claim appears to be valid with high confidence. 
                Damage assessment matches the incident description and repair costs are within normal range.
              </p>
              <Button className="w-full" size="sm">
                Approve Payout
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetails;