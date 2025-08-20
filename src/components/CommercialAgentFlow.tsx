import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  FileText, 
  Shield, 
  Search, 
  Calculator, 
  Users, 
  Send,
  ArrowRight
} from "lucide-react";

interface AgentStep {
  id: string;
  name: string;
  description: string;
  icon: any;
  status: 'pending' | 'processing' | 'completed' | 'error';
  duration?: string;
  result?: string;
}

interface CommercialAgentFlowProps {
  claimData?: any;
  isActive: boolean;
}

export const CommercialAgentFlow = ({ claimData, isActive }: CommercialAgentFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const agentSteps: AgentStep[] = [
    {
      id: "fnol-intake",
      name: "FNOL Intake Agent",
      description: "Collecting and structuring loss data from submitted FNOL",
      icon: FileText,
      status: 'pending'
    },
    {
      id: "validation",
      name: "Claim Validation Agent", 
      description: "Validating policy number, fleet schedule, and driver authorization",
      icon: Shield,
      status: 'pending'
    },
    {
      id: "coverage",
      name: "Coverage Verification Agent",
      description: "Matching loss type with available coverages (Collision, Comprehensive, Cargo, Liability)",
      icon: Search,
      status: 'pending'
    },
    {
      id: "adjuster",
      name: "Adjuster Assignment Agent",
      description: "Assigning adjuster based on state, claim type, and current workload",
      icon: Users,
      status: 'pending'
    },
    {
      id: "file-creation",
      name: "Claim File Creation Agent",
      description: "Generating claim record in CMS with unique claim number",
      icon: Calculator,
      status: 'pending'
    },
    {
      id: "notification",
      name: "Notification Agent",
      description: "Sending notifications and updating downstream systems",
      icon: Send,
      status: 'pending'
    }
  ];

  const [steps, setSteps] = useState(agentSteps);

  useEffect(() => {
    if (!isActive) return;

    const processSteps = async () => {
      for (let i = 0; i < steps.length; i++) {
        // Mark as processing
        setSteps(prev => prev.map((step, index) => 
          index === i ? { ...step, status: 'processing' } : step
        ));
        setCurrentStep(i);
        setProgress(((i + 0.5) / steps.length) * 100);

        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 2000));

        // Mark as completed with results
        setSteps(prev => prev.map((step, index) => 
          index === i ? { 
            ...step, 
            status: 'completed',
            duration: `${(2 + Math.random() * 3).toFixed(1)}s`,
            result: getStepResult(step.id)
          } : step
        ));
        setProgress(((i + 1) / steps.length) * 100);
      }
    };

    processSteps();
  }, [isActive]);

  const getStepResult = (stepId: string) => {
    switch (stepId) {
      case "fnol-intake":
        return "Structured loss data extracted. Policy: CAI-2024-987654, Fleet: 3 vehicles, Location: Dallas, TX";
      case "validation":
        return "✓ Policy active ✓ Driver authorized ✓ Fleet schedule verified";
      case "coverage":
        return "Applicable: Collision ($1M), Comprehensive ($500K), General Liability ($2M)";
      case "adjuster":
        return "Assigned: Sarah Martinez (Commercial Auto Specialist, Dallas region, 12 open claims)";
      case "file-creation":
        return `Claim ${claimData?.claimId || 'CAI-2024-123456'} created in CMS. File packet generated.`;
      case "notification":
        return "Email sent to fleet owner. SharePoint updated. Dashboard synchronized.";
      default:
        return "Processing completed successfully";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-primary animate-spin" />;
      case 'error':
        return <CheckCircle className="h-5 w-5 text-destructive" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'default';
      case 'error':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Commercial Auto AI Agent Pipeline</h3>
        <p className="text-muted-foreground">Processing commercial fleet claim through autonomous agent workflow</p>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === currentStep;
          const isPast = index < currentStep;
          
          return (
            <div
              key={step.id}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all ${
                isActive 
                  ? 'border-primary bg-primary/5 shadow-sm' 
                  : isPast 
                    ? 'border-success/20 bg-success/5'
                    : 'border-border bg-card'
              }`}
            >
              <div className={`p-2 rounded-full ${
                step.status === 'completed' 
                  ? 'bg-success/10' 
                  : step.status === 'processing'
                    ? 'bg-primary/10'
                    : 'bg-muted'
              }`}>
                <Icon className={`h-5 w-5 ${
                  step.status === 'completed'
                    ? 'text-success'
                    : step.status === 'processing' 
                      ? 'text-primary'
                      : 'text-muted-foreground'
                }`} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{step.name}</h4>
                  {getStatusIcon(step.status)}
                  <Badge variant={getStatusColor(step.status) as any} className="text-xs">
                    {step.status === 'processing' ? 'Processing...' : step.status}
                  </Badge>
                  {step.duration && (
                    <span className="text-xs text-muted-foreground">({step.duration})</span>
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                
                {step.result && (
                  <div className="bg-muted/50 rounded-md p-3 text-sm">
                    <strong>Result:</strong> {step.result}
                  </div>
                )}
              </div>
              
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center">
                  <ArrowRight className={`h-4 w-4 ${
                    isPast ? 'text-success' : 'text-muted-foreground'
                  }`} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {progress === 100 && (
        <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center gap-2 text-success font-semibold mb-2">
            <CheckCircle className="h-5 w-5" />
            Commercial Auto Claim Processing Complete
          </div>
          <p className="text-sm text-muted-foreground">
            Claim has been successfully processed and assigned to adjuster. All stakeholders have been notified.
          </p>
        </div>
      )}
    </Card>
  );
};