import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
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
      description: "Extracting information from uploaded FNOL forms, fleet schedules, and documents",
      icon: FileText,
      status: 'pending'
    },
    {
      id: "validation",
      name: "Validation Agent", 
      description: "Cross-checking policies, fleet, drivers and validating policy period and matching details",
      icon: Shield,
      status: 'pending'
    },
    {
      id: "fraud-detection",
      name: "Fraud Detection Agent",
      description: "Detecting suspicious claims and staged accidents using AI pattern recognition",
      icon: Search,
      status: 'pending'
    },
    {
      id: "claim-creation",
      name: "Claim Creation Agent",
      description: "Creating claim in CMS, assigning adjuster by expertise & bandwidth, generating claim number",
      icon: Calculator,
      status: 'pending'
    },
    {
      id: "coverage",
      name: "Coverage Verification Agent",
      description: "Deciding what's covered and what's not based on policy terms and incident details",
      icon: Users,
      status: 'pending'
    },
    {
      id: "damage-assessment",
      name: "Damage Assessment Agent",
      description: "Assessing damage/loss based on evidence and estimating overall loss/cost amount",
      icon: Calculator,
      status: 'pending'
    },
    {
      id: "settlement",
      name: "Settlement Agent",
      description: "Calculating payout with deductibles & liability applied for final settlement",
      icon: Calculator,
      status: 'pending'
    },
    {
      id: "communication",
      name: "Communication Agent",
      description: "Drafting professional payout email to fleet owners/brokers and updating systems",
      icon: Send,
      status: 'pending'
    }
  ];

  const [steps, setSteps] = useState(agentSteps);
  const [agentOutputs, setAgentOutputs] = useState<Record<string, any>>({});
  const [editableOutputs, setEditableOutputs] = useState<Record<string, string>>({});

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
        const stepResult = getStepResult(steps[i].id);
        setSteps(prev => prev.map((step, index) => 
          index === i ? { 
            ...step, 
            status: 'completed',
            duration: `${(2 + Math.random() * 3).toFixed(1)}s`,
            result: stepResult.text
          } : step
        ));
        
        // Store agent output
        setAgentOutputs(prev => ({
          ...prev,
          [steps[i].id]: stepResult.json
        }));
        
        // Initialize editable output
        setEditableOutputs(prev => ({
          ...prev,
          [steps[i].id]: JSON.stringify(stepResult.json, null, 2)
        }));
        
        setProgress(((i + 1) / steps.length) * 100);
      }
    };

    processSteps();
  }, [isActive]);

  const getStepResult = (stepId: string) => {
    const results = {
      "fnol-intake": {
        json: {
          policy: "CAI-2024-987654",
          fleetOwner: "ABC Logistics Inc",
          dotNumber: "DOT-123456",
          incidentDate: "2024-01-15",
          location: "I-35, Dallas, TX",
          vehiclesInvolved: ["VIN-ABC123", "VIN-XYZ789"],
          driverInfo: { name: "John Smith", cdl: "TX-CDL-456" }
        },
        text: "FNOL data extracted from uploaded documents"
      },
      "validation": {
        json: {
          policyStatus: "Active",
          policyPeriod: "2024-01-01 to 2024-12-31",
          fleetMatch: "Verified",
          driverAuthorized: "Valid CDL",
          validation: "PASSED"
        },
        text: "✓ Policy active ✓ Driver authorized ✓ Fleet schedule verified"
      },
      "fraud-detection": {
        json: {
          riskScore: 15,
          indicators: [],
          recommendation: "PROCEED",
          confidence: 98
        },
        text: "Low fraud risk detected. Claim cleared for processing."
      },
      "claim-creation": {
        json: {
          claimNumber: claimData?.claimId || 'CAI-2024-123456',
          adjuster: {
            name: "Sarah Martinez",
            specialty: "Commercial Auto",
            region: "Dallas",
            openClaims: 12
          },
          status: "CREATED"
        },
        text: `Claim ${claimData?.claimId || 'CAI-2024-123456'} created. Adjuster assigned.`
      },
      "coverage": {
        json: {
          collision: { covered: true, limit: "$1M", deductible: "$2,500" },
          comprehensive: { covered: true, limit: "$500K", deductible: "$1,000" },
          liability: { covered: true, limit: "$2M", deductible: "$0" },
          cargo: { covered: false, reason: "Not applicable for this incident" }
        },
        text: "Coverage verified: Collision, Comprehensive, General Liability"
      },
      "damage-assessment": {
        json: {
          vehicle1: { damage: "Front-end collision", estimate: "$15,000" },
          vehicle2: { damage: "Rear-end damage", estimate: "$8,500" },
          totalLoss: "$23,500",
          confidence: 94
        },
        text: "Total estimated damage: $23,500 across 2 vehicles"
      },
      "settlement": {
        json: {
          grossAmount: "$23,500",
          deductibles: "$3,500",
          netPayout: "$20,000",
          paymentMethod: "ACH Transfer"
        },
        text: "Settlement calculated: $20,000 after deductibles"
      },
      "communication": {
        json: {
          emailDrafted: true,
          recipient: "claims@abclogistics.com",
          ccBroker: "broker@insurance.com",
          systemsUpdated: ["CMS", "SharePoint", "Dashboard"]
        },
        text: "Professional email drafted and systems updated"
      }
    };
    
    return results[stepId] || { json: {}, text: "Processing completed successfully" };
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
                  <div className="bg-muted/50 rounded-md p-3 text-sm space-y-2">
                    <div><strong>Result:</strong> {step.result}</div>
                    {agentOutputs[step.id] && (
                      <div className="space-y-2">
                        <strong>Agent Output (JSON):</strong>
                        <textarea
                          value={editableOutputs[step.id] || ''}
                          onChange={(e) => setEditableOutputs(prev => ({
                            ...prev,
                            [step.id]: e.target.value
                          }))}
                          className="w-full h-32 p-2 text-xs font-mono bg-background border rounded resize-none"
                          placeholder="Agent output JSON..."
                        />
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            try {
                              const parsed = JSON.parse(editableOutputs[step.id]);
                              setAgentOutputs(prev => ({
                                ...prev,
                                [step.id]: parsed
                              }));
                              
                              // Update dashboard with final edited version
                              const existingClaims = JSON.parse(localStorage.getItem('submittedCommercialClaims') || '[]');
                              const updatedClaims = existingClaims.map((claim: any) => 
                                claim.claimId === claimData?.claimId 
                                  ? { ...claim, agentOutputs: { ...claim.agentOutputs, [step.id]: parsed } }
                                  : claim
                              );
                              localStorage.setItem('submittedCommercialClaims', JSON.stringify(updatedClaims));
                              
                              alert('Output updated and saved to dashboard!');
                            } catch (error) {
                              alert('Invalid JSON format. Please fix and try again.');
                            }
                          }}
                          className="text-xs"
                        >
                          Save Changes
                        </Button>
                      </div>
                    )}
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