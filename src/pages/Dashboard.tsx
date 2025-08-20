import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  XCircle,
  Truck,
  Building,
  MapPin,
  Download
} from "lucide-react";

// Mock commercial auto claims data
const commercialClaimsData = [
  {
    id: "CAI-2024-001234",
    type: "Commercial Auto",
    status: "AI Processing",
    fleetOwner: "Logistics Express Inc.",
    contactPerson: "John Smith",
    estimatedPayout: "$12,850",
    vehiclesInvolved: ["FL123ABC", "TX456DEF"],
    incidentDate: "2024-01-15",
    assignedAdjuster: "Sarah Martinez",
    location: "Dallas, TX",
    claimType: "Collision + Cargo",
    priority: "high"
  },
  {
    id: "CAI-2024-001235", 
    type: "Commercial Auto",
    status: "Adjuster Assigned",
    fleetOwner: "Metro Delivery Services",
    contactPerson: "Lisa Johnson",
    estimatedPayout: "$8,200",
    vehiclesInvolved: ["CA789GHI"],
    incidentDate: "2024-01-14",
    assignedAdjuster: "Mike Chen",
    location: "Los Angeles, CA",
    claimType: "Comprehensive",
    priority: "normal"
  },
  {
    id: "CAI-2024-001236",
    type: "Commercial Auto", 
    status: "Investigation",
    fleetOwner: "Construction Fleet Co.",
    contactPerson: "Robert Davis",
    estimatedPayout: "$25,500",
    vehiclesInvolved: ["NY123XYZ", "NY456ABC"],
    incidentDate: "2024-01-13",
    assignedAdjuster: "Jennifer Liu",
    location: "New York, NY",
    claimType: "Liability + Property",
    priority: "high"
  },
  {
    id: "CAI-2024-001237",
    type: "Commercial Auto",
    status: "Closed",
    fleetOwner: "Regional Transport LLC",
    contactPerson: "Amanda Wilson",
    estimatedPayout: "$4,950",
    vehiclesInvolved: ["FL789DEF"],
    incidentDate: "2024-01-12",
    assignedAdjuster: "David Thompson",
    location: "Miami, FL",
    claimType: "Collision",
    priority: "normal"
  }
];

// Legacy personal auto claims for comparison
const personalClaimsData = [
  {
    id: "AS-2024-001234",
    type: "Personal Auto",
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
    type: "Personal Auto", 
    status: "Pending Approval",
    claimant: "Sarah Johnson",
    estimatedPayout: "$3,200",
    damageType: "Side Panel",
    aiConfidence: 87,
    submittedDate: "2024-01-14",
    priority: "high"
  }
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("commercial-claims");
  const [claimType, setClaimType] = useState("all");
  const [allClaims, setAllClaims] = useState([...commercialClaimsData, ...personalClaimsData]);

  useEffect(() => {
    // Load submitted claims from localStorage and merge with existing data
    const submittedClaims = JSON.parse(localStorage.getItem('submittedClaims') || '[]');
    const submittedCommercialClaims = JSON.parse(localStorage.getItem('submittedCommercialClaims') || '[]');
    
    const transformedPersonalClaims = submittedClaims.map((claim: any) => ({
      id: claim.id,
      type: "Personal Auto",
      status: claim.status,
      claimant: claim.claimantName,
      estimatedPayout: claim.estimatedPayout,
      damageType: claim.damageType,
      aiConfidence: claim.confidenceScore,
      submittedDate: new Date(claim.submittedAt).toLocaleDateString(),
      priority: "normal"
    }));

    const transformedCommercialClaims = submittedCommercialClaims.map((claim: any) => ({
      id: claim.claimId,
      type: "Commercial Auto",
      status: "AI Processing",
      fleetOwner: claim.fleetOwnerName,
      contactPerson: claim.contactPerson,
      estimatedPayout: "$15,000",
      vehiclesInvolved: claim.vehiclesInvolved?.slice(0, 2) || [],
      incidentDate: claim.incidentDate,
      assignedAdjuster: "Auto-Assigned",
      location: claim.incidentLocation,
      claimType: "Commercial Auto",
      priority: "normal"
    }));

    // Combine all claims
    const combinedClaims = [
      ...commercialClaimsData, 
      ...personalClaimsData, 
      ...transformedPersonalClaims,
      ...transformedCommercialClaims
    ];
    
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
    let filtered = allClaims;
    
    // Filter by claim type first
    if (claimType !== "all") {
      filtered = filtered.filter(claim => {
        if (claimType === "commercial") return claim.type === "Commercial Auto";
        if (claimType === "personal") return claim.type === "Personal Auto";
        return true;
      });
    }
    
    // Then filter by status
    switch (status) {
      case "commercial-claims":
        return filtered.filter(claim => 
          claim.type === "Commercial Auto" && 
          ["AI Processing", "Adjuster Assigned", "Investigation"].includes(claim.status)
        );
      case "fleet-view":
        return filtered.filter(claim => claim.type === "Commercial Auto");
      case "adjuster-dashboard":
        return filtered.filter(claim => (claim as any).assignedAdjuster && (claim as any).assignedAdjuster !== "Auto-Assigned");
      case "investigation":
        return filtered.filter(claim => 
          claim.status === "Investigation Required" || claim.status === "Investigation"
        );
      case "closed":
        return filtered.filter(claim => claim.status === "Approved" || claim.status === "Closed");
      default:
        return filtered;
    }
  };

  const filteredClaims = filterClaimsByStatus(activeTab).filter(claim => {
    const searchLower = searchTerm.toLowerCase();
    const claimAny = claim as any;
    return (
      claim.id.toLowerCase().includes(searchLower) ||
      (claimAny.claimant && claimAny.claimant.toLowerCase().includes(searchLower)) ||
      (claimAny.fleetOwner && claimAny.fleetOwner.toLowerCase().includes(searchLower)) ||
      (claimAny.contactPerson && claimAny.contactPerson.toLowerCase().includes(searchLower)) ||
      (claimAny.location && claimAny.location.toLowerCase().includes(searchLower))
    );
  });

  const exportClaimPacket = (claim: any) => {
    // Simulate export functionality
    const packet = {
      claimSummary: claim,
      timestamp: new Date().toISOString(),
      exportType: "Commercial Auto Claim Packet"
    };
    
    console.log("Exporting claim packet:", packet);
    alert(`Claim packet for ${claim.id} exported successfully!`);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Commercial Auto Claims Management</h1>
          <p className="text-muted-foreground">AutoSure Claims AI - Commercial Fleet Portal</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Commercial Claims</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
              <Truck className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="text-sm text-success">+18%</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fleet Vehicles</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
              </div>
              <Building className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-muted-foreground">Across 34 fleets</span>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Payouts</p>
                <p className="text-2xl font-bold text-foreground">$4.8M</p>
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
                <p className="text-sm font-medium text-muted-foreground">Active Adjusters</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-success">6.8 avg claims/adjuster</span>
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
                placeholder="Search by Claim ID, Fleet Owner, Contact Person, or Location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={claimType} onValueChange={setClaimType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Claim Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Claims</SelectItem>
                <SelectItem value="commercial">Commercial Auto</SelectItem>
                <SelectItem value="personal">Personal Auto</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="commercial-claims" className="flex items-center">
                <Truck className="h-4 w-4 mr-2" />
                Commercial Claims
              </TabsTrigger>
              <TabsTrigger value="fleet-view" className="flex items-center">
                <Building className="h-4 w-4 mr-2" />
                Fleet View
              </TabsTrigger>
              <TabsTrigger value="adjuster-dashboard" className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Adjuster Dashboard
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
              {activeTab === "fleet-view" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredClaims.map((claim) => {
                    const claimAny = claim as any;
                    return (
                    <Card key={claim.id} className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">{claimAny.fleetOwner}</h4>
                        <Badge variant={getStatusColor(claim.status) as any}>
                          {claim.status}
                        </Badge>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{claimAny.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span>{claimAny.vehiclesInvolved?.join(", ") || "Vehicle info pending"}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-primary">{claim.estimatedPayout}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => navigate(`/claim/${claim.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => exportClaimPacket(claim)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                    );
                  })}
                </div>
              ) : activeTab === "adjuster-dashboard" ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Sarah Martinez</h4>
                      <p className="text-sm text-muted-foreground mb-2">Commercial Auto Specialist</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Claims: 8</span>
                        <Badge variant="secondary">Dallas, TX</Badge>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Mike Chen</h4>
                      <p className="text-sm text-muted-foreground mb-2">Fleet Claims Expert</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Claims: 6</span>
                        <Badge variant="secondary">Los Angeles, CA</Badge>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <h4 className="font-semibold mb-2">Jennifer Liu</h4>
                      <p className="text-sm text-muted-foreground mb-2">Heavy Vehicle Specialist</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Active Claims: 9</span>
                        <Badge variant="secondary">New York, NY</Badge>
                      </div>
                    </Card>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Claim ID</TableHead>
                        <TableHead>Fleet Owner</TableHead>
                        <TableHead>Assigned Adjuster</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredClaims.map((claim) => {
                        const claimAny = claim as any;
                        return (
                        <TableRow key={claim.id}>
                          <TableCell className="font-medium">{claim.id}</TableCell>
                          <TableCell>{claimAny.fleetOwner}</TableCell>
                          <TableCell>{claimAny.assignedAdjuster}</TableCell>
                          <TableCell>{claimAny.location}</TableCell>
                          <TableCell>
                            <Badge variant={getStatusColor(claim.status) as any}>
                              {claim.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/claim/${claim.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim ID</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Fleet Owner / Claimant</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Vehicles / Damage</TableHead>
                      <TableHead>Estimated Payout</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.map((claim) => {
                      const claimAny = claim as any;
                      return (
                      <TableRow key={claim.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">{claim.id}</TableCell>
                        <TableCell>
                          <Badge variant={claim.type === "Commercial Auto" ? "default" : "secondary"}>
                            {claim.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(claim.status)}
                            <Badge variant={getStatusColor(claim.status) as any}>
                              {claim.status}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{claimAny.fleetOwner || claimAny.claimant}</TableCell>
                        <TableCell>{claimAny.contactPerson || "-"}</TableCell>
                        <TableCell>
                          {claimAny.vehiclesInvolved ? 
                            claimAny.vehiclesInvolved.join(", ") : 
                            claimAny.damageType || "-"
                          }
                        </TableCell>
                        <TableCell className="font-medium text-primary">
                          {claim.estimatedPayout}
                        </TableCell>
                        <TableCell>{claimAny.incidentDate || claimAny.submittedDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigate(`/claim/${claim.id}`)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {claim.type === "Commercial Auto" && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => exportClaimPacket(claim)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              )}

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