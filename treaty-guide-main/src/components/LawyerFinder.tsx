import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, MapPin, Star, Phone, Mail, Award, DollarSign, Filter } from 'lucide-react';

interface Lawyer {
  id: number;
  name: string;
  specialization: string;
  location: string;
  rating: number;
  reviewCount: number;
  successRate: number;
  hourlyRate: string;
  experience: string;
  description: string;
  verified: boolean;
}

const LawyerFinder = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  
  const lawyers: Lawyer[] = [
    {
      id: 1,
      name: "Sarah Mitchell, Esq.",
      specialization: "Contract Law",
      location: "New York, NY",
      rating: 4.9,
      reviewCount: 127,
      successRate: 94,
      hourlyRate: "$450-650",
      experience: "15+ years",
      description: "Specializes in complex commercial contracts and risk mitigation. Former BigLaw partner with extensive M&A experience.",
      verified: true
    },
    {
      id: 2,
      name: "David Chen, J.D.",
      specialization: "Business Law",
      location: "San Francisco, CA",
      rating: 4.8,
      reviewCount: 89,
      successRate: 91,
      hourlyRate: "$400-550",
      experience: "12+ years",
      description: "Expert in startup law, intellectual property, and contract negotiations. Tech industry focused practice.",
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez, Esq.",
      specialization: "Employment Law",
      location: "Chicago, IL",
      rating: 4.7,
      reviewCount: 156,
      successRate: 89,
      hourlyRate: "$350-500",
      experience: "10+ years",
      description: "Experienced in employment contracts, non-compete agreements, and workplace compliance issues.",
      verified: false
    },
    {
      id: 4,
      name: "Michael Thompson, J.D.",
      specialization: "Real Estate Law",
      location: "Austin, TX",
      rating: 4.6,
      reviewCount: 73,
      successRate: 87,
      hourlyRate: "$300-450",
      experience: "8+ years",
      description: "Focuses on commercial real estate transactions, leasing agreements, and property disputes.",
      verified: true
    }
  ];

  const specializations = [
    "All Specializations",
    "Contract Law",
    "Business Law", 
    "Employment Law",
    "Real Estate Law",
    "Intellectual Property",
    "Corporate Law"
  ];

  const filteredLawyers = lawyers.filter(lawyer => {
    const matchesLocation = !searchLocation || lawyer.location.toLowerCase().includes(searchLocation.toLowerCase());
    const matchesSpecialization = !selectedSpecialization || selectedSpecialization === "All Specializations" || lawyer.specialization === selectedSpecialization;
    return matchesLocation && matchesSpecialization;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-legal-text">
            <Users className="h-5 w-5 text-legal-gold" />
            <span>Find Qualified Lawyers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-legal-text-muted">Location</label>
              <Input
                placeholder="Enter city or state..."
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="bg-legal-gray border-legal-gray text-legal-text"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-legal-text-muted">Specialization</label>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization}>
                <SelectTrigger className="bg-legal-gray border-legal-gray text-legal-text">
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button className="w-full bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
                <Filter className="h-4 w-4 mr-2" />
                Search Lawyers
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lawyers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredLawyers.map((lawyer) => (
          <Card key={lawyer.id} className="bg-gradient-card border-legal-gray shadow-card hover:shadow-elevated transition-all duration-300">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-legal-text text-lg">{lawyer.name}</CardTitle>
                    {lawyer.verified && (
                      <Badge className="bg-status-success text-white">
                        <Award className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-legal-gold text-sm font-medium">{lawyer.specialization}</p>
                  <div className="flex items-center space-x-1 text-legal-text-muted text-sm">
                    <MapPin className="h-3 w-3" />
                    <span>{lawyer.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-legal-gold fill-current" />
                    <span className="text-legal-text font-medium">{lawyer.rating}</span>
                    <span className="text-legal-text-muted text-sm">({lawyer.reviewCount})</span>
                  </div>
                  <p className="text-legal-text-muted text-sm">{lawyer.experience}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-legal-text-muted text-sm">{lawyer.description}</p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-2 bg-legal-gray rounded-lg">
                  <div className="text-status-success font-bold">{lawyer.successRate}%</div>
                  <div className="text-legal-text-muted text-xs">Success Rate</div>
                </div>
                <div className="text-center p-2 bg-legal-gray rounded-lg">
                  <div className="text-legal-gold font-bold flex items-center justify-center">
                    <DollarSign className="h-3 w-3" />
                    <span className="text-sm">{lawyer.hourlyRate}</span>
                  </div>
                  <div className="text-legal-text-muted text-xs">Hourly Rate</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
                  <Phone className="h-3 w-3 mr-1" />
                  Call
                </Button>
                <Button variant="outline" size="sm" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
                  <Mail className="h-3 w-3 mr-1" />
                  Email
                </Button>
              </div>
              
              <Button className="w-full bg-legal-gold hover:bg-legal-gold/90 text-legal-navy">
                Contact {lawyer.name.split(',')[0]}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredLawyers.length === 0 && (
        <Card className="bg-gradient-card border-legal-gray shadow-card">
          <CardContent className="text-center py-8">
            <Users className="h-12 w-12 text-legal-text-muted mx-auto mb-4" />
            <h3 className="text-legal-text text-lg font-medium mb-2">No lawyers found</h3>
            <p className="text-legal-text-muted">Try adjusting your search criteria to find more results.</p>
          </CardContent>
        </Card>
      )}

      {/* Additional Services */}
      <Card className="bg-gradient-card border-legal-gray shadow-card">
        <CardHeader>
          <CardTitle className="text-legal-text">Need More Help?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-legal-text-muted">
            Can't find the right lawyer? Our AI can help match you with specialists based on your specific legal needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              Get AI Recommendations
            </Button>
            <Button variant="outline" className="border-legal-gold text-legal-gold hover:bg-legal-gold hover:text-legal-navy">
              Schedule Consultation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LawyerFinder;