import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Upload, MapPin, Calendar, User, FileText, Camera, Receipt, CheckCircle, Bot } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const steps = [
  { id: 1, title: "Claimant Details", icon: User },
  { id: 2, title: "Incident Details", icon: FileText },
  { id: 3, title: "Upload Evidence", icon: Upload },
  { id: 4, title: "Confirm & Submit", icon: CheckCircle }
];

const ReportClaim = () => {
  const navigate = useNavigate();
  const [workflowType, setWorkflowType] = useState<"guided" | "quick">("guided");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    policyNumber: "",
    incidentDate: "",
    incidentTime: "",
    location: "",
    description: "",
    files: [] as File[]
  });

  const [aiSuggestions] = useState([
    "Make sure to include photos of all damaged areas",
    "Don't forget to upload your police report if available",
    "Include receipts for any immediate repairs or towing"
  ]);

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({ ...prev, files: [...prev.files, ...files] }));
  };

  const handleQuickSubmit = () => {
    if (formData.files.length === 0) {
      alert("Please upload at least one document before submitting.");
      return;
    }
    
    // Create claim object
    const claimId = "AS-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6);
    const newClaim = {
      id: claimId,
      claimantName: formData.name || "Quick Upload Customer",
      email: formData.email || "customer@email.com",
      policyNumber: formData.policyNumber || "POL-" + Math.random().toString(36).substr(2, 6).toUpperCase(),
      status: "AI Processing",
      estimatedPayout: "$1,350",
      damageType: "Collision",
      confidenceScore: 92,
      submittedAt: new Date().toISOString(),
      files: formData.files,
      workflowType: "quick"
    };
    
    // Store in localStorage for dashboard access
    const existingClaims = JSON.parse(localStorage.getItem('submittedClaims') || '[]');
    existingClaims.push(newClaim);
    localStorage.setItem('submittedClaims', JSON.stringify(existingClaims));
    
    console.log("Quick claim submitted:", newClaim);
    
    // Show success message and redirect to workflow visualization
    alert(`Claim ${claimId} submitted successfully! Watch the AI processing...`);
    navigate(`/workflow?claimId=${claimId}`);
  };

  const handleGuidedSubmit = () => {
    // Validate required fields for guided submission
    if (!formData.name || !formData.email || !formData.policyNumber) {
      alert("Please fill in all required claimant details.");
      return;
    }
    
    // Create claim object
    const claimId = "AS-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6);
    const newClaim = {
      id: claimId,
      claimantName: formData.name,
      email: formData.email,
      policyNumber: formData.policyNumber,
      status: "AI Processing",
      estimatedPayout: "$1,850",
      damageType: "Collision",
      confidenceScore: 95,
      submittedAt: new Date().toISOString(),
      files: formData.files,
      workflowType: "guided",
      incidentDetails: {
        date: formData.incidentDate,
        time: formData.incidentTime,
        location: formData.location,
        description: formData.description
      }
    };
    
    // Store in localStorage for dashboard access
    const existingClaims = JSON.parse(localStorage.getItem('submittedClaims') || '[]');
    existingClaims.push(newClaim);
    localStorage.setItem('submittedClaims', JSON.stringify(existingClaims));
    
    console.log("Guided claim submitted:", newClaim);
    
    // Show success message and redirect to workflow visualization
    alert(`Claim ${claimId} submitted successfully! Watch the AI processing...`);
    navigate(`/workflow?claimId=${claimId}`);
  };

  const renderQuickUploadFlow = () => {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-4">Commercial FNOL Document Upload</h2>
          <p className="text-muted-foreground">Upload fleet schedules, FNOL forms, and evidence - our AI extracts all details</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-8 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
            <label className="cursor-pointer">
              <input type="file" className="hidden" accept=".pdf,image/*" multiple onChange={handleFileUpload} />
              <div className="text-center">
                <Upload className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">Upload All Documents</h3>
                <p className="text-muted-foreground">FNOL forms, fleet schedules, damage photos, police reports, cargo docs</p>
                <p className="text-sm text-muted-foreground mt-2">Drag & drop or click to browse</p>
              </div>
            </label>
          </Card>
          
          <Card className="p-8 bg-primary/5 border-primary/20">
            <Bot className="h-16 w-16 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2 text-center">AI Will Extract</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Fleet policy and schedule validation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Multi-vehicle incident processing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Commercial coverage verification
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                Cargo and liability assessment
              </li>
            </ul>
          </Card>
        </div>
        
        {formData.files.length > 0 && (
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Uploaded Files ({formData.files.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {formData.files.map((file, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm truncate">{file.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 text-center">
              <Button 
                size="lg" 
                onClick={handleQuickSubmit}
                disabled={formData.files.length === 0}
                className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white font-semibold py-3 px-8"
              >
                Submit All Documents to AI Agent
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </Card>
        )}
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="John Doe" 
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(555) 123-4567" 
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="john@example.com" 
                />
              </div>
              <div>
                <Label htmlFor="policy">Policy Number</Label>
                <Input 
                  id="policy" 
                  value={formData.policyNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
                  placeholder="AS-123456789" 
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date of Incident</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="date" 
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
                    className="pl-10" 
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="time">Time of Incident</Label>
                <Input 
                  id="time" 
                  type="time"
                  value={formData.incidentTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, incidentTime: e.target.value }))}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="location" 
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="123 Main St, City, State 12345" 
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="description">Description of Incident</Label>
                <Textarea 
                  id="description" 
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Please describe what happened in detail..."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <Card className="p-6 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.xlsx,.csv" onChange={handleFileUpload} />
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">FNOL Forms</h3>
                    <p className="text-sm text-muted-foreground">Upload PDF/Excel</p>
                  </div>
                </label>
              </Card>
              
              <Card className="p-6 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept=".xlsx,.csv" onChange={handleFileUpload} />
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Fleet Schedule</h3>
                    <p className="text-sm text-muted-foreground">Upload Excel/CSV</p>
                  </div>
                </label>
              </Card>
              
              <Card className="p-6 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept="image/*" multiple onChange={handleFileUpload} />
                  <div className="text-center">
                    <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Damage Photos</h3>
                    <p className="text-sm text-muted-foreground">Upload vehicle/cargo</p>
                  </div>
                </label>
              </Card>
              
              <Card className="p-6 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.jpg,.png" onChange={handleFileUpload} />
                  <div className="text-center">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Police Reports</h3>
                    <p className="text-sm text-muted-foreground">Upload PDF/Images</p>
                  </div>
                </label>
              </Card>
              
              <Card className="p-6 border-dashed border-2 hover:border-primary transition-colors cursor-pointer">
                <label className="cursor-pointer">
                  <input type="file" className="hidden" accept=".pdf,.xlsx,.jpg,.png" onChange={handleFileUpload} />
                  <div className="text-center">
                    <Receipt className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Documents</h3>
                    <p className="text-sm text-muted-foreground">Bills of lading, etc.</p>
                  </div>
                </label>
              </Card>
            </div>
            
            {formData.files.length > 0 && (
              <div>
                <h3 className="font-semibold mb-3">Uploaded Files:</h3>
                <div className="space-y-2">
                  {formData.files.map((file, index) => (
                    <Badge key={index} variant="secondary" className="mr-2">
                      {file.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <Card className="p-6 bg-muted">
              <h3 className="font-semibold mb-4">Claim Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Claimant:</strong> {formData.name}</p>
                  <p><strong>Policy:</strong> {formData.policyNumber}</p>
                  <p><strong>Email:</strong> {formData.email}</p>
                </div>
                <div>
                  <p><strong>Date:</strong> {formData.incidentDate}</p>
                  <p><strong>Location:</strong> {formData.location}</p>
                  <p><strong>Files:</strong> {formData.files.length} uploaded</p>
                </div>
              </div>
              <div className="mt-4">
                <p><strong>Description:</strong></p>
                <p className="text-muted-foreground">{formData.description}</p>
              </div>
            </Card>
            
            <div className="text-center">
              <Button 
                size="lg" 
                onClick={handleGuidedSubmit}
                className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white font-semibold py-3 px-8"
              >
                Submit Claim to AI Agent
              </Button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground mb-2">Report Commercial Auto FNOL</h1>
                <p className="text-muted-foreground">Submit First Notice of Loss for your commercial fleet</p>
              </div>
              
              {/* Workflow Selection */}
              <Card className="p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant={workflowType === "guided" ? "default" : "outline"}
                    onClick={() => setWorkflowType("guided")}
                    className="h-20 flex-col gap-2"
                  >
                    <User className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-semibold">Guided Process</div>
                      <div className="text-xs opacity-75">Step-by-step guidance</div>
                    </div>
                  </Button>
                  <Button
                    variant={workflowType === "quick" ? "default" : "outline"}
                    onClick={() => setWorkflowType("quick")}
                    className="h-20 flex-col gap-2"
                  >
                    <Upload className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-semibold">Quick Upload</div>
                      <div className="text-xs opacity-75">Upload all documents at once</div>
                    </div>
                  </Button>
                </div>
              </Card>
              
              {workflowType === "quick" ? renderQuickUploadFlow() : (
                <>
                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      {steps.map((step, index) => (
                        <div key={step.id} className="flex items-center">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                            currentStep >= step.id ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300 text-gray-400'
                          }`}>
                            <step.icon className="h-5 w-5" />
                          </div>
                          <div className="ml-3 hidden sm:block">
                            <p className={`text-sm font-medium ${currentStep >= step.id ? 'text-primary' : 'text-gray-400'}`}>
                              {step.title}
                            </p>
                          </div>
                          {index < steps.length - 1 && (
                            <div className={`w-16 h-1 mx-4 ${currentStep > step.id ? 'bg-primary' : 'bg-gray-200'}`} />
                          )}
                        </div>
                      ))}
                    </div>
                    <Progress value={(currentStep / steps.length) * 100} className="h-2" />
                  </div>
                  
                  {/* Step Content */}
                  <Card className="p-8 mb-8">
                    <h2 className="text-xl font-semibold mb-6">{steps[currentStep - 1].title}</h2>
                    {renderStepContent()}
                  </Card>
                  
                  {/* Navigation */}
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={prevStep} 
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Previous
                    </Button>
                    <Button 
                      onClick={nextStep} 
                      disabled={currentStep === 4}
                      className="flex items-center"
                    >
                      Next
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </>
              )}
        </div>
            
            {/* AI Assistant Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <div className="flex items-center mb-4">
                  <Bot className="h-6 w-6 text-primary mr-2" />
                  <h3 className="font-semibold">AI Assistant</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-primary-light rounded-lg">
                    <p className="text-sm">
                      👋 Hi! I'm here to help you file your claim. I'll analyze your documents and provide real-time guidance.
                    </p>
                  </div>
                  
                  {currentStep === 3 && formData.files.length > 0 && (
                    <div className="p-4 bg-accent/20 rounded-lg border border-accent">
                      <p className="text-sm font-medium text-accent-foreground">
                        🔍 Document Analysis
                      </p>
                      <p className="text-sm mt-2">
                        I can see you've uploaded damage photos. The rear bumper damage is clearly visible. Would you like me to auto-submit this to our AI adjuster?
                      </p>
                    </div>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Tips for this step:</h4>
                    <ul className="space-y-2">
                      {aiSuggestions.map((tip, index) => (
                        <li key={index} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-2 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportClaim;