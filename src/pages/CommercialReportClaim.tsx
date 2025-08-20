import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Truck, Upload, FileSpreadsheet, CheckCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { FleetUpload } from "@/components/FleetUpload";
import { CommercialFNOLForm } from "@/components/CommercialFNOLForm";
import { CommercialAgentFlow } from "@/components/CommercialAgentFlow";

const CommercialReportClaim = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [vehicles, setVehicles] = useState([]);
  const [policyData, setPolicyData] = useState(null);
  const [showAgentFlow, setShowAgentFlow] = useState(false);
  const [submittedClaim, setSubmittedClaim] = useState(null);

  const steps = [
    { id: 1, title: "Fleet & Policy Setup", icon: FileSpreadsheet },
    { id: 2, title: "FNOL Intake", icon: Truck },
    { id: 3, title: "AI Processing", icon: CheckCircle }
  ];

  const handleFleetDataChange = (newVehicles: any) => {
    setVehicles(newVehicles);
  };

  const handlePolicyDataChange = (newPolicy: any) => {
    setPolicyData(newPolicy);
  };

  const handleFNOLSubmit = (formData: any) => {
    // Store in localStorage for dashboard access
    const existingClaims = JSON.parse(localStorage.getItem('submittedCommercialClaims') || '[]');
    existingClaims.push(formData);
    localStorage.setItem('submittedCommercialClaims', JSON.stringify(existingClaims));
    
    setSubmittedClaim(formData);
    setCurrentStep(3);
    setShowAgentFlow(true);
    
    // Auto-redirect to dashboard after processing
    setTimeout(() => {
      navigate('/dashboard');
    }, 15000);
  };

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToStep2 = vehicles.length > 0 && policyData;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')} 
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Commercial Auto FNOL
            </h1>
            <p className="text-muted-foreground">
              Fleet insurance first notice of loss reporting
            </p>
          </div>

          {/* Progress */}
          <Card className="p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === step.id;
                const isCompleted = currentStep > step.id;
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-success border-success text-success-foreground' 
                        : isActive 
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'bg-background border-muted-foreground text-muted-foreground'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-primary' : isCompleted ? 'text-success' : 'text-muted-foreground'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-12 h-px mx-4 ${
                        isCompleted ? 'bg-success' : 'bg-muted'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
            <Progress value={(currentStep / steps.length) * 100} className="h-2" />
          </Card>

          {/* Step Content */}
          <div className="space-y-6">
            {currentStep === 1 && (
              <div>
                <FleetUpload 
                  onFleetDataChange={handleFleetDataChange}
                  onPolicyDataChange={handlePolicyDataChange}
                />
                
                <div className="flex justify-end mt-6">
                  <Button 
                    onClick={nextStep}
                    disabled={!canProceedToStep2}
                    className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                  >
                    Continue to FNOL Intake
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <CommercialFNOLForm 
                  vehicles={vehicles}
                  policyData={policyData}
                  onSubmit={handleFNOLSubmit}
                />
                
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={prevStep}>
                    Back to Fleet Setup
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <Card className="p-6 bg-success/10 border-success/20">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle className="h-6 w-6 text-success" />
                    <h3 className="text-lg font-semibold text-success">FNOL Submitted Successfully</h3>
                  </div>
                  <p className="text-muted-foreground">
                    Claim {submittedClaim?.claimId} has been submitted and is now being processed through our AI agent pipeline.
                  </p>
                </Card>

                <CommercialAgentFlow 
                  claimData={submittedClaim}
                  isActive={showAgentFlow}
                />

                <div className="text-center">
                  <Button 
                    onClick={() => navigate('/dashboard')}
                    className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90"
                  >
                    View in Claims Dashboard
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommercialReportClaim;