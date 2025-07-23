import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  FileText, 
  Search, 
  Image, 
  Calculator, 
  Shield, 
  DollarSign, 
  Mail,
  ArrowLeft 
} from "lucide-react";

const workflowSteps = [
  {
    id: 1,
    title: "Input Detection",
    description: "Agent detects document type",
    icon: FileText,
    duration: 2000,
    details: "Analyzing uploaded files: 2 images, 1 PDF police report"
  },
  {
    id: 2,
    title: "Claim Intake",
    description: "Extract details → populate claim object",
    icon: Search,
    duration: 3000,
    details: "Extracting claimant info, incident details, and policy number"
  },
  {
    id: 3,
    title: "Policy Matching",
    description: "Check policy knowledge base",
    icon: Shield,
    duration: 1500,
    details: "Policy AS-POL-789456 found - Active, Collision coverage confirmed"
  },
  {
    id: 4,
    title: "Damage Assessment",
    description: "Analyze uploaded images",
    icon: Image,
    duration: 4000,
    details: "AI detected: Rear bumper crack, minor scratches - 92% confidence"
  },
  {
    id: 5,
    title: "Cost Estimation",
    description: "Query repair cost database",
    icon: Calculator,
    duration: 2500,
    details: "Local repair shop rates: $1,200 parts + $650 labor = $1,850 total"
  },
  {
    id: 6,
    title: "Coverage Validation",
    description: "Cross-validate with policy terms",
    icon: Shield,
    duration: 1800,
    details: "Deductible: $500, Coverage limit: $25,000 - Claim approved"
  },
  {
    id: 7,
    title: "Payout Calculation",
    description: "Calculate & send recommendation",
    icon: DollarSign,
    duration: 1200,
    details: "Final payout: $1,850 - $500 (deductible) = $1,350"
  },
  {
    id: 8,
    title: "Notification",
    description: "Send email + update systems",
    icon: Mail,
    duration: 1000,
    details: "Email sent to claimant, SharePoint updated, dashboard refreshed"
  }
];

const WorkflowVisualization = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [claimData, setClaimData] = useState<any>(null);

  const claimId = searchParams.get('claimId');

  useEffect(() => {
    if (claimId) {
      // Get claim data from localStorage
      const submittedClaims = JSON.parse(localStorage.getItem('submittedClaims') || '[]');
      const claim = submittedClaims.find((c: any) => c.id === claimId);
      if (claim) {
        setClaimData(claim);
        // Auto-start the workflow when coming from claim submission
        setTimeout(() => setIsRunning(true), 1000);
      }
    }
  }, [claimId]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && currentStep < workflowSteps.length) {
      const step = workflowSteps[currentStep];
      let stepProgress = 0;
      
      interval = setInterval(() => {
        stepProgress += 2;
        setProgress(stepProgress);
        
        if (stepProgress >= 100) {
          setCompletedSteps(prev => [...prev, currentStep]);
          setCurrentStep(prev => prev + 1);
          setProgress(0);
          
          if (currentStep + 1 >= workflowSteps.length) {
            setIsRunning(false);
          }
        }
      }, step.duration / 50);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, currentStep]);

  const startWorkflow = () => {
    setIsRunning(true);
  };

  const pauseWorkflow = () => {
    setIsRunning(false);
  };

  const resetWorkflow = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setCompletedSteps([]);
    setProgress(0);
  };

  const getStepStatus = (stepIndex: number) => {
    if (completedSteps.includes(stepIndex)) return "completed";
    if (stepIndex === currentStep && isRunning) return "processing";
    return "pending";
  };

  const getStepIcon = (stepIndex: number, IconComponent: any) => {
    const status = getStepStatus(stepIndex);
    
    if (status === "completed") {
      return <CheckCircle className="h-8 w-8 text-success" />;
    } else if (status === "processing") {
      return <Clock className="h-8 w-8 text-primary animate-spin" />;
    } else {
      return <IconComponent className="h-8 w-8 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">AutoSure AI Workflow Visualization</h1>
            <p className="text-muted-foreground">Behind-the-scenes autonomous agent pipeline</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard')}
              className="flex items-center"
            >
              View Dashboard
            </Button>
          </div>
        </div>

        {/* Controls */}
        <Card className="p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2">Workflow Controls</h3>
              <p className="text-muted-foreground">
                Simulating claim processing for: <strong>{claimData?.id || "AS-2024-001234"}</strong>
                {claimData && (
                  <span className="block text-sm mt-1">
                    Claimant: {claimData.claimantName} | Policy: {claimData.policyNumber}
                  </span>
                )}
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={startWorkflow} 
                disabled={isRunning || completedSteps.length === workflowSteps.length}
                className="flex items-center"
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
              <Button 
                onClick={pauseWorkflow} 
                disabled={!isRunning}
                variant="outline"
                className="flex items-center"
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button 
                onClick={resetWorkflow} 
                variant="outline"
                className="flex items-center"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
          
          {/* Overall Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Overall Progress</span>
              <span>{Math.round((completedSteps.length / workflowSteps.length) * 100)}%</span>
            </div>
            <Progress 
              value={(completedSteps.length / workflowSteps.length) * 100} 
              className="h-2"
            />
          </div>
        </Card>

        {/* Workflow Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {workflowSteps.map((step, index) => {
            const status = getStepStatus(index);
            
            return (
              <Card 
                key={step.id} 
                className={`p-6 transition-all duration-300 ${
                  status === "completed" ? "border-success bg-success/5" :
                  status === "processing" ? "border-primary bg-primary/5 shadow-lg scale-105" :
                  "border-border"
                }`}
              >
                <div className="text-center">
                  <div className="mb-4">
                    {getStepIcon(index, step.icon)}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{step.description}</p>
                  
                  {status === "processing" && (
                    <div className="mb-3">
                      <Progress value={progress} className="h-1" />
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground p-2 bg-muted rounded">
                    {step.details}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Real-time Logs */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Real-time Processing Logs</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto bg-gray-900 text-green-400 p-4 rounded font-mono text-sm">
            {completedSteps.map((stepIndex) => {
              const step = workflowSteps[stepIndex];
              return (
                <div key={stepIndex} className="flex items-center gap-2">
                  <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>STEP {stepIndex + 1} COMPLETED: {step.title}</span>
                </div>
              );
            })}
            
            {isRunning && currentStep < workflowSteps.length && (
              <div className="flex items-center gap-2">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                <Clock className="h-4 w-4 text-yellow-400 animate-spin" />
                <span>PROCESSING: {workflowSteps[currentStep].title}...</span>
              </div>
            )}
            
            {!isRunning && completedSteps.length === 0 && (
              <div className="text-gray-500">Waiting to start workflow...</div>
            )}
            
            {completedSteps.length === workflowSteps.length && (
              <div className="flex items-center gap-2 text-green-400 font-bold">
                <CheckCircle className="h-4 w-4" />
                <span>WORKFLOW COMPLETED SUCCESSFULLY - Claim ready for review</span>
              </div>
            )}
          </div>
        </Card>

        {/* Sample Assets */}
        <Card className="p-6 mt-8">
          <h3 className="font-semibold text-lg mb-4">Sample Assets Being Processed</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium text-sm">Police Report</p>
              <p className="text-xs text-muted-foreground">police_report_20240115.pdf</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium text-sm">Damage Photos</p>
              <p className="text-xs text-muted-foreground">2 high-res images</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium text-sm">Repair Costs DB</p>
              <p className="text-xs text-muted-foreground">Local shop rates</p>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
              <p className="font-medium text-sm">Policy KB</p>
              <p className="text-xs text-muted-foreground">Coverage database</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowVisualization;