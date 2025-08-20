import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, Truck, Package, AlertTriangle } from "lucide-react";

interface Vehicle {
  vin: string;
  licensePlate: string;
  state: string;
  vehicleType: string;
  assignedDriver: string;
}

interface CommercialFNOLFormProps {
  vehicles: Vehicle[];
  policyData: any;
  onSubmit: (formData: any) => void;
}

export const CommercialFNOLForm = ({ vehicles, policyData, onSubmit }: CommercialFNOLFormProps) => {
  const [formData, setFormData] = useState({
    policyNumber: policyData?.policyNumber || "",
    fleetOwnerName: policyData?.fleetOwnerName || "",
    contactPerson: "",
    contactPhone: "",
    contactEmail: "",
    incidentDate: "",
    incidentTime: "",
    incidentLocation: "",
    description: "",
    vehiclesInvolved: [] as string[],
    driverDetails: {
      name: "",
      licenseNumber: "",
      isAuthorized: false,
      wasInjured: false
    },
    cargoDetails: {
      hasCargoDamage: false,
      cargoType: "",
      cargoValue: "",
      damageDescription: ""
    },
    thirdPartyDetails: {
      hasThirdPartyDamage: false,
      hasBodilyInjury: false,
      propertyDamage: "",
      injuryDescription: "",
      thirdPartyInfo: ""
    }
  });

  const handleVehicleSelection = (vehicleVin: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      vehiclesInvolved: checked 
        ? [...prev.vehiclesInvolved, vehicleVin]
        : prev.vehiclesInvolved.filter(vin => vin !== vehicleVin)
    }));
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.contactPerson || !formData.incidentDate || formData.vehiclesInvolved.length === 0) {
      alert("Please fill in all required fields and select at least one vehicle.");
      return;
    }

    const fnolData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      claimId: "CAI-" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6)
    };

    onSubmit(fnolData);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="policyNumber">Policy Number *</Label>
            <Input
              id="policyNumber"
              value={formData.policyNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, policyNumber: e.target.value }))}
              readOnly={!!policyData}
              className={policyData ? "bg-muted" : ""}
            />
          </div>
          <div>
            <Label htmlFor="fleetOwnerName">Fleet Owner Name *</Label>
            <Input
              id="fleetOwnerName"
              value={formData.fleetOwnerName}
              onChange={(e) => setFormData(prev => ({ ...prev, fleetOwnerName: e.target.value }))}
              readOnly={!!policyData}
              className={policyData ? "bg-muted" : ""}
            />
          </div>
          <div>
            <Label htmlFor="contactPerson">Contact Person *</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
              placeholder="Primary contact for this claim"
            />
          </div>
          <div>
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              value={formData.contactPhone}
              onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
              placeholder="(555) 123-4567"
            />
          </div>
          <div>
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input
              id="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, contactEmail: e.target.value }))}
              placeholder="contact@company.com"
            />
          </div>
        </div>
      </Card>

      {/* Incident Details */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Incident Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="incidentDate">Incident Date *</Label>
            <Input
              id="incidentDate"
              type="date"
              value={formData.incidentDate}
              onChange={(e) => setFormData(prev => ({ ...prev, incidentDate: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="incidentTime">Incident Time</Label>
            <Input
              id="incidentTime"
              type="time"
              value={formData.incidentTime}
              onChange={(e) => setFormData(prev => ({ ...prev, incidentTime: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="incidentLocation">Incident Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="incidentLocation"
                value={formData.incidentLocation}
                onChange={(e) => setFormData(prev => ({ ...prev, incidentLocation: e.target.value }))}
                placeholder="Street address, city, state, ZIP"
                className="pl-10"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Description of Loss *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Detailed description of what happened..."
              rows={4}
            />
          </div>
        </div>
      </Card>

      {/* Vehicle Selection */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Truck className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Vehicles Involved *</h3>
        </div>
        
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vehicles.map((vehicle, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                <Checkbox
                  id={`vehicle-${index}`}
                  checked={formData.vehiclesInvolved.includes(vehicle.vin)}
                  onCheckedChange={(checked) => handleVehicleSelection(vehicle.vin, checked as boolean)}
                />
                <div className="flex-1">
                  <Label htmlFor={`vehicle-${index}`} className="cursor-pointer">
                    <div className="font-medium">{vehicle.licensePlate} - {vehicle.vehicleType}</div>
                    <div className="text-sm text-muted-foreground">
                      VIN: {vehicle.vin} | Driver: {vehicle.assignedDriver}
                    </div>
                  </Label>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Truck className="h-12 w-12 mx-auto mb-4" />
            <p>No fleet vehicles available. Please upload fleet schedule first.</p>
          </div>
        )}
      </Card>

      {/* Driver Details */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <User className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Driver Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="driverName">Driver Name</Label>
            <Input
              id="driverName"
              value={formData.driverDetails.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                driverDetails: { ...prev.driverDetails, name: e.target.value }
              }))}
              placeholder="Driver's full name"
            />
          </div>
          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              value={formData.driverDetails.licenseNumber}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                driverDetails: { ...prev.driverDetails, licenseNumber: e.target.value }
              }))}
              placeholder="Driver's license number"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isAuthorized"
              checked={formData.driverDetails.isAuthorized}
              onCheckedChange={(checked) => setFormData(prev => ({
                ...prev,
                driverDetails: { ...prev.driverDetails, isAuthorized: checked as boolean }
              }))}
            />
            <Label htmlFor="isAuthorized">Driver was authorized to operate vehicle</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="wasInjured"
              checked={formData.driverDetails.wasInjured}
              onCheckedChange={(checked) => setFormData(prev => ({
                ...prev,
                driverDetails: { ...prev.driverDetails, wasInjured: checked as boolean }
              }))}
            />
            <Label htmlFor="wasInjured">Driver was injured in the incident</Label>
          </div>
        </div>
      </Card>

      {/* Cargo Details */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <Package className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Cargo Information</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasCargoDamage"
              checked={formData.cargoDetails.hasCargoDamage}
              onCheckedChange={(checked) => setFormData(prev => ({
                ...prev,
                cargoDetails: { ...prev.cargoDetails, hasCargoDamage: checked as boolean }
              }))}
            />
            <Label htmlFor="hasCargoDamage">Cargo was damaged in the incident</Label>
          </div>

          {formData.cargoDetails.hasCargoDamage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="cargoType">Cargo Type</Label>
                <Input
                  id="cargoType"
                  value={formData.cargoDetails.cargoType}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    cargoDetails: { ...prev.cargoDetails, cargoType: e.target.value }
                  }))}
                  placeholder="Type of cargo (electronics, food, etc.)"
                />
              </div>
              <div>
                <Label htmlFor="cargoValue">Estimated Cargo Value</Label>
                <Input
                  id="cargoValue"
                  value={formData.cargoDetails.cargoValue}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    cargoDetails: { ...prev.cargoDetails, cargoValue: e.target.value }
                  }))}
                  placeholder="$10,000"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="cargoDescription">Cargo Damage Description</Label>
                <Textarea
                  id="cargoDescription"
                  value={formData.cargoDetails.damageDescription}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    cargoDetails: { ...prev.cargoDetails, damageDescription: e.target.value }
                  }))}
                  placeholder="Describe the cargo damage..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Third Party Details */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="h-6 w-6 text-primary" />
          <h3 className="text-lg font-semibold">Third Party Information</h3>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasThirdPartyDamage"
                checked={formData.thirdPartyDetails.hasThirdPartyDamage}
                onCheckedChange={(checked) => setFormData(prev => ({
                  ...prev,
                  thirdPartyDetails: { ...prev.thirdPartyDetails, hasThirdPartyDamage: checked as boolean }
                }))}
              />
              <Label htmlFor="hasThirdPartyDamage">Third party property damage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasBodilyInjury"
                checked={formData.thirdPartyDetails.hasBodilyInjury}
                onCheckedChange={(checked) => setFormData(prev => ({
                  ...prev,
                  thirdPartyDetails: { ...prev.thirdPartyDetails, hasBodilyInjury: checked as boolean }
                }))}
              />
              <Label htmlFor="hasBodilyInjury">Third party bodily injury</Label>
            </div>
          </div>

          {(formData.thirdPartyDetails.hasThirdPartyDamage || formData.thirdPartyDetails.hasBodilyInjury) && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              {formData.thirdPartyDetails.hasThirdPartyDamage && (
                <div>
                  <Label htmlFor="propertyDamage">Property Damage Description</Label>
                  <Textarea
                    id="propertyDamage"
                    value={formData.thirdPartyDetails.propertyDamage}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      thirdPartyDetails: { ...prev.thirdPartyDetails, propertyDamage: e.target.value }
                    }))}
                    placeholder="Describe third party property damage..."
                    rows={3}
                  />
                </div>
              )}
              {formData.thirdPartyDetails.hasBodilyInjury && (
                <div>
                  <Label htmlFor="injuryDescription">Bodily Injury Description</Label>
                  <Textarea
                    id="injuryDescription"
                    value={formData.thirdPartyDetails.injuryDescription}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      thirdPartyDetails: { ...prev.thirdPartyDetails, injuryDescription: e.target.value }
                    }))}
                    placeholder="Describe injuries sustained..."
                    rows={3}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="thirdPartyInfo">Third Party Contact Information</Label>
                <Textarea
                  id="thirdPartyInfo"
                  value={formData.thirdPartyDetails.thirdPartyInfo}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    thirdPartyDetails: { ...prev.thirdPartyDetails, thirdPartyInfo: e.target.value }
                  }))}
                  placeholder="Names, contact information, insurance details..."
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Submit Button */}
      <Card className="p-6">
        <div className="text-center">
          <Button
            size="lg"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary to-primary-dark hover:opacity-90 text-white font-semibold py-3 px-8"
          >
            Submit Commercial FNOL
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            All information will be processed through our AI agent pipeline
          </p>
        </div>
      </Card>
    </div>
  );
};