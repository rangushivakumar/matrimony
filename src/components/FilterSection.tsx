
import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

const FilterSection = () => {
  const { toast } = useToast();
  const [lookingFor, setLookingFor] = useState("");
  const [minAge, setMinAge] = useState("25");
  const [maxAge, setMaxAge] = useState("35");
  const [religion, setReligion] = useState("");
  const [caste, setCaste] = useState("");
  const [phone, setPhone] = useState("");

  // Define caste options based on selected religion
  const casteOptions: Record<string, string[]> = {
    hindu: ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Other"],
    muslim: ["Sunni", "Shia", "Sufi", "Other"],
    christian: ["Catholic", "Protestant", "Orthodox", "Other"],
    sikh: ["Jatt", "Khatri", "Ramgarhia", "Other"],
    other: ["Not Specified"]
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!lookingFor || !religion || !phone) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Form validation - Phone number
    if (!/^\d{10}$/.test(phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    // Validate age range
    const minAgeNum = parseInt(minAge);
    const maxAgeNum = parseInt(maxAge);
    
    if (isNaN(minAgeNum) || isNaN(maxAgeNum) || minAgeNum > maxAgeNum || minAgeNum < 18 || maxAgeNum > 70) {
      toast({
        title: "Invalid Age Range",
        description: "Please enter a valid age range (Min: 18, Max: 70)",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Search Request Submitted!",
      description: "We'll contact you with matching profiles soon.",
    });
  };

  return (
    <section className="py-16 px-4 bg-white" id="filter-section">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          <span className="text-primary">Find</span> Your Perfect <span className="text-secondary">Match</span>
        </h2>
        
        <Card className="max-w-4xl mx-auto border-primary/30 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/10">
            <CardTitle className="text-center text-secondary">Match Preferences</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Looking For */}
                <div className="space-y-2">
                  <Label htmlFor="lookingFor">Looking For</Label>
                  <Select value={lookingFor} onValueChange={setLookingFor}>
                    <SelectTrigger id="lookingFor" className="w-full">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Religion */}
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Select value={religion} onValueChange={(value) => {
                    setReligion(value);
                    setCaste("");
                  }}>
                    <SelectTrigger id="religion" className="w-full">
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Caste - Only show if religion is selected */}
                {religion && (
                  <div className="space-y-2">
                    <Label htmlFor="caste">Caste</Label>
                    <Select value={caste} onValueChange={setCaste}>
                      <SelectTrigger id="caste" className="w-full">
                        <SelectValue placeholder="Select caste" />
                      </SelectTrigger>
                      <SelectContent>
                        {casteOptions[religion]?.map((option) => (
                          <SelectItem key={option} value={option.toLowerCase()}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your 10-digit number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                {/* Age Range - two input boxes instead of slider */}
                <div className="space-y-2">
                  <Label>Age Range</Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      type="number"
                      min="18"
                      max="70"
                      placeholder="Min"
                      value={minAge}
                      onChange={(e) => setMinAge(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      min="18"
                      max="70"
                      placeholder="Max"
                      value={maxAge}
                      onChange={(e) => setMaxAge(e.target.value)}
                      className="w-20"
                    />
                    <span className="text-gray-500">years</span>
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="mt-8 text-center">
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full w-full md:w-auto"
                >
                  Find Matches
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FilterSection;
