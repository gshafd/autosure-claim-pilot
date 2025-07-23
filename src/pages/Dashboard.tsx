import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Search, 
  Filter, 
  Eye, 
  MoreHorizontal, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Clock,
  FileText,
  CheckCircle,
  AlertTriangle,
  XCircle
} from "lucide-react";

const claimsData = [
  {
    id: "AS-2024-001234",
    status: "AI Processing",
    claimant: "John Smith",
    estimatedPayout: "$1,850",
    damageType: "Rear Bumper",
    aiConfidence: 92,
    submittedDate: "2024-01-15",
    priority: "normal"
  },
  {
    id: "AS-2024-001235",
    status: "Pending Approval",
    claimant: "Sarah Johnson",
    estimatedPayout: "$3,200",
    damageType: "Side Panel",
    aiConfidence: 87,
    submittedDate: "2024-01-14",
    priority: "high"
  },
  {
    id: "AS-2024-001236",
    status: "Approved",
    claimant: "Mike Davis",
    estimatedPayout: "$950",
    damageType: "Windshield",
    aiConfidence: 98,
    submittedDate: "2024-01-13",
    priority: "normal"
  },
  {
    id: "AS-2024-001237",
    status: "Investigation Required",
    claimant: "Lisa Wilson",
    estimatedPayout: "$5,500",
    damageType: "Total Loss",
    aiConfidence: 45,
    submittedDate: "2024-01-12",
    priority: "high"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("new-claims");
  const [allClaims, setAllClaims] = useState(claimsData);

  useEffect(() => {
    // Load submitted claims from localStorage and merge with existing data
    const submittedClaims = JSON.parse(localStorage.getItem('submittedClaims') || '[]');
    const transformedSubmittedClaims = submittedClaims.map((claim: any) => ({
      id: claim.id,
      status: claim.status,
      claimant: claim.claimantName,
      estimatedPayout: claim.estimatedPayout,
      damageType: claim.damageType,
      aiConfidence: claim.confidenceScore,
      submittedDate: new Date(claim.submittedAt).toLocaleDateString(),
      priority: "normal"
    }));

    // Combine and deduplicate claims
    const combinedClaims = [...claimsData, ...transformedSubmittedClaims];
    const uniqueClaims = combinedClaims.filter((claim, index, self) => 
      index === self.findIndex(c => c.id === claim.id)
    );

    setAllClaims(uniqueClaims);
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-4 w-4 text-success" />;
      case "AI Processing": return <Clock className="h-4 w-4 text-primary" />;
      case "Pending Approval": return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "Investigation Required": return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "success";
      case "AI Processing": return "secondary";
      case "Pending Approval": return "warning";
      case "Investigation Required": return "destructive";
      default: return "secondary";
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-success";
    if (confidence >= 70) return "text-warning";
    return "text-destructive";
  };

  const filterClaimsByStatus = (status: string) => {
    switch (status) {
      case "new-claims":
        return allClaims.filter(claim => ["AI Processing", "Pending Approval"].includes(claim.status));
      case "ai-decisions":
        return allClaims.filter(claim => claim.status === "AI Processing");
      case "investigation":
        return allClaims.filter(claim => claim.status === "Investigation Required");
      case "closed":
        return allClaims.filter(claim => claim.status === "Approved");
      default:
        return allClaims;
    }
  };

  const filteredClaims = filterClaimsByStatus(activeTab).filter(claim =>
    claim.claimant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    claim.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Claims Management Dashboard</h1>
          <p className="text-muted-foreground">AutoSure Claims AI - Internal Portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Claims</p>
                <p className="text-2xl font-bold text-foreground">247</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm text-success">+12%</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">AI Processed</p>
                <p className="text-2xl font-bold text-foreground">189</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-muted-foreground">76% automation rate</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payouts</p>
                <p className="text-2xl font-bold text-foreground">$2.1M</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-muted-foreground">This month</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Processing</p>
                <p className="text-2xl font-bold text-foreground">2.3h</p>
              </div>
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-success">-45% faster</span>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="p-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search claims by ID or claimant name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="new-claims" className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                New Claims
              </TabsTrigger>
              <TabsTrigger value="ai-decisions" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                AI Decisions
              </TabsTrigger>
              <TabsTrigger value="investigation" className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Investigation
              </TabsTrigger>
              <TabsTrigger value="closed" className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2" />
                Closed
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Estimated Payout</TableHead>
                    <TableHead>Damage Type</TableHead>
                    <TableHead>AI Confidence</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow key={claim.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(claim.status)}
                          <Badge variant={getStatusColor(claim.status) as any}>
                            {claim.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{claim.claimant}</TableCell>
                      <TableCell className="font-medium text-primary">
                        {claim.estimatedPayout}
                      </TableCell>
                      <TableCell>{claim.damageType}</TableCell>
                      <TableCell>
                        <span className={`font-medium ${getConfidenceColor(claim.aiConfidence)}`}>
                          {claim.aiConfidence}%
                        </span>
                      </TableCell>
                      <TableCell>{claim.submittedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => navigate(`/claim-details/${claim.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {filteredClaims.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="font-semibold mb-2">No claims found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search criteria or check a different tab.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;