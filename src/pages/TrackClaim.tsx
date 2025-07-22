import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const sampleClaims = [
  {
    id: "AS-2024-001234",
    status: "In Review",
    type: "Auto Collision",
    dateSubmitted: "2024-01-15",
    estimatedPayout: "$1,850",
    progress: 75
  },
  {
    id: "AS-2024-001180",
    status: "Approved",
    type: "Comprehensive",
    dateSubmitted: "2024-01-10",
    estimatedPayout: "$3,200",
    progress: 100
  }
];

const TrackClaim = () => {
  const [claimNumber, setClaimNumber] = useState("");
  const [searchResults, setSearchResults] = useState(sampleClaims);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved": return <CheckCircle className="h-5 w-5 text-success" />;
      case "In Review": return <Clock className="h-5 w-5 text-warning" />;
      case "Denied": return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "success";
      case "In Review": return "secondary";
      case "Denied": return "destructive";
      default: return "secondary";
    }
  };

  const handleSearch = () => {
    if (claimNumber) {
      const filtered = sampleClaims.filter(claim => 
        claim.id.toLowerCase().includes(claimNumber.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults(sampleClaims);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Claim</h1>
            <p className="text-muted-foreground">Enter your claim number or policy number to check status</p>
          </div>
          
          {/* Search Section */}
          <Card className="p-6 mb-8">
            <div className="flex gap-4">
              <div className="flex-1">
                <Label htmlFor="claim-search">Claim Number or Policy Number</Label>
                <Input 
                  id="claim-search"
                  value={claimNumber}
                  onChange={(e) => setClaimNumber(e.target.value)}
                  placeholder="AS-2024-001234 or Policy Number"
                  className="mt-1"
                />
              </div>
              <div className="flex items-end">
                <Button onClick={handleSearch} className="flex items-center">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Results */}
          <div className="space-y-4">
            {searchResults.map((claim) => (
              <Card key={claim.id} className="p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusIcon(claim.status)}
                      <h3 className="font-semibold text-lg">{claim.id}</h3>
                      <Badge variant={getStatusColor(claim.status) as any}>
                        {claim.status}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground">{claim.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg text-primary">{claim.estimatedPayout}</p>
                    <p className="text-sm text-muted-foreground">Estimated Payout</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium">Date Submitted</p>
                    <p className="text-sm text-muted-foreground">{claim.dateSubmitted}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Progress</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${claim.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{claim.progress}%</span>
                    </div>
                  </div>
                  <div>
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </div>
                </div>
                
                {claim.status === "In Review" && (
                  <div className="p-4 bg-primary-light rounded-lg">
                    <p className="text-sm">
                      <strong>Latest Update:</strong> Your claim is being reviewed by our AI system. 
                      We'll notify you as soon as the review is complete.
                    </p>
                  </div>
                )}
                
                {claim.status === "Approved" && (
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <p className="text-sm">
                      <strong>Good news!</strong> Your claim has been approved. 
                      Payment will be processed within 2-3 business days.
                    </p>
                  </div>
                )}
              </Card>
            ))}
          </div>
          
          {searchResults.length === 0 && (
            <Card className="p-8 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="font-semibold mb-2">No Claims Found</h3>
              <p className="text-muted-foreground">
                We couldn't find any claims matching your search. Please check your claim number and try again.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TrackClaim;