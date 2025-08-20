import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Trash2 } from "lucide-react";

interface Vehicle {
  vin: string;
  licensePlate: string;
  state: string;
  vehicleType: string;
  assignedDriver: string;
}

interface FleetUploadProps {
  onFleetDataChange: (vehicles: Vehicle[]) => void;
  onPolicyDataChange: (policy: any) => void;
}

export const FleetUpload = ({ onFleetDataChange, onPolicyDataChange }: FleetUploadProps) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [policyData, setPolicyData] = useState<any>(null);
  const [uploadStatus, setUploadStatus] = useState<{
    fleet: 'idle' | 'success' | 'error';
    policy: 'idle' | 'success' | 'error';
  }>({ fleet: 'idle', policy: 'idle' });

  const handleFleetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Simulate CSV/Excel parsing
    setUploadStatus(prev => ({ ...prev, fleet: 'success' }));
    
    // Mock fleet data
    const mockVehicles: Vehicle[] = [
      {
        vin: "1HGBH41JXMN109186",
        licensePlate: "FL123ABC",
        state: "FL",
        vehicleType: "Box Truck",
        assignedDriver: "John Smith"
      },
      {
        vin: "2T1BURHE8JC123456",
        licensePlate: "TX456DEF",
        state: "TX", 
        vehicleType: "Delivery Van",
        assignedDriver: "Sarah Johnson"
      },
      {
        vin: "3VWD17AJ8EM123789",
        licensePlate: "CA789GHI",
        state: "CA",
        vehicleType: "Semi-Trailer",
        assignedDriver: "Mike Davis"
      }
    ];
    
    setVehicles(mockVehicles);
    onFleetDataChange(mockVehicles);
  };

  const handlePolicyUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus(prev => ({ ...prev, policy: 'success' }));
    
    // Mock policy data
    const mockPolicy = {
      policyNumber: "CAI-2024-987654",
      policyStart: "2024-01-01",
      policyEnd: "2024-12-31",
      fleetOwnerName: "Logistics Express Inc.",
      dotNumber: "DOT-123456",
      coverageTypes: ["Collision", "Comprehensive", "Cargo", "General Liability"],
      limits: {
        collision: "$1,000,000",
        comprehensive: "$500,000", 
        cargo: "$100,000",
        liability: "$2,000,000"
      },
      additionalCoverages: ["Roadside Assistance", "Rental Reimbursement"]
    };
    
    setPolicyData(mockPolicy);
    onPolicyDataChange(mockPolicy);
  };

  const removeVehicle = (index: number) => {
    const updatedVehicles = vehicles.filter((_, i) => i !== index);
    setVehicles(updatedVehicles);
    onFleetDataChange(updatedVehicles);
  };

  return (
    <div className="space-y-6">
      {/* Fleet Schedule Upload */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileSpreadsheet className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Fleet Schedule Upload</h3>
          {uploadStatus.fleet === 'success' && (
            <Badge variant="default" className="bg-success text-success-foreground">
              <CheckCircle className="h-3 w-3 mr-1" />
              Uploaded
            </Badge>
          )}
        </div>
        
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Label htmlFor="fleet-upload" className="cursor-pointer">
            <Input
              id="fleet-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handleFleetUpload}
              className="hidden"
            />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="font-semibold mb-2">Upload Fleet Schedule</h4>
            <p className="text-sm text-muted-foreground mb-4">
              CSV or Excel file with VIN, License Plate, State, Vehicle Type, Assigned Driver
            </p>
            <Button variant="outline">Browse Files</Button>
          </Label>
        </div>

        {vehicles.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Fleet Vehicles ({vehicles.length})</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>VIN</TableHead>
                  <TableHead>License Plate</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>Assigned Driver</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-sm">{vehicle.vin}</TableCell>
                    <TableCell>{vehicle.licensePlate}</TableCell>
                    <TableCell>{vehicle.state}</TableCell>
                    <TableCell>{vehicle.vehicleType}</TableCell>
                    <TableCell>{vehicle.assignedDriver}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeVehicle(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      {/* Policy Upload */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <FileSpreadsheet className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Commercial Policy Upload</h3>
          {uploadStatus.policy === 'success' && (
            <Badge variant="default" className="bg-success text-success-foreground">
              <CheckCircle className="h-3 w-3 mr-1" />
              Uploaded
            </Badge>
          )}
        </div>
        
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
          <Label htmlFor="policy-upload" className="cursor-pointer">
            <Input
              id="policy-upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              onChange={handlePolicyUpload}
              className="hidden"
            />
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h4 className="font-semibold mb-2">Upload Commercial Policy</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Excel/CSV with Policy Number, Fleet Owner, DOT Number, Coverage Types, Limits
            </p>
            <Button variant="outline">Browse Files</Button>
          </Label>
        </div>

        {policyData && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p><strong>Policy Number:</strong> {policyData.policyNumber}</p>
              <p><strong>Fleet Owner:</strong> {policyData.fleetOwnerName}</p>
              <p><strong>DOT Number:</strong> {policyData.dotNumber}</p>
              <p><strong>Policy Period:</strong> {policyData.policyStart} to {policyData.policyEnd}</p>
            </div>
            <div className="space-y-2">
              <p><strong>Coverage Types:</strong></p>
              <div className="flex flex-wrap gap-1">
                {policyData.coverageTypes.map((coverage: string, index: number) => (
                  <Badge key={index} variant="secondary">{coverage}</Badge>
                ))}
              </div>
              <p><strong>Additional Coverages:</strong></p>
              <div className="flex flex-wrap gap-1">
                {policyData.additionalCoverages.map((coverage: string, index: number) => (
                  <Badge key={index} variant="outline">{coverage}</Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};