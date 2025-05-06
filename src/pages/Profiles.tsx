
import { useEffect, useState, useRef, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import { useSearchParams, useLocation, Navigate } from 'react-router-dom';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { dummyProfiles } from '../data/profiles';

const PROFILES_PER_PAGE = 20;

const Profiles = () => {
  // Check if user is logged in
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const searchCriteria = location.state?.searchCriteria;
  const filterType = location.state?.filterType;
  const filterValue = location.state?.filterValue;
  
  const [selectedReligion, setSelectedReligion] = useState<string>("");
  const [selectedCaste, setSelectedCaste] = useState<string>("");
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<string>("");
  const [ageRange, setAgeRange] = useState({
    min: 18,
    max: 40
  });
  const [filteredProfiles, setFilteredProfiles] = useState(dummyProfiles);
  const [visibleProfiles, setVisibleProfiles] = useState<typeof dummyProfiles>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProfileElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);
  
  const religionOptions = ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Other"];
  
  const casteOptions: Record<string, string[]> = {
    Hindu: ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Kamma", "Reddy", "Kapu", "Yadav", "Naidu", "Other"],
    Muslim: ["Sunni", "Shia", "Sufi", "Other"],
    Christian: ["Catholic", "Protestant", "Orthodox", "Other"],
    Sikh: ["Jatt", "Khatri", "Ramgarhia", "Other"],
    Jain: ["Digambar", "Shvetambar", "Other"],
    Other: ["Not Specified"]
  };

  const cityOptions = ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"];
  const stateOptions = ["Maharashtra", "Tamil Nadu", "Karnataka", "Delhi", "West Bengal", "Telangana", "Gujarat", "Kerala"];
  const motherTongueOptions = ["Telugu", "Tamil", "Hindi", "Malayalam", "Kannada", "Bengali", "Marathi", "Gujarati"];

  useEffect(() => {
    // If not logged in, this will redirect to login page
    if (!isLoggedIn) return;
    
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Get religion from URL parameter
    const religionParam = searchParams.get('religion');
    if (religionParam) {
      const capitalizedReligion = religionParam.charAt(0).toUpperCase() + religionParam.slice(1);
      setSelectedReligion(capitalizedReligion);
    }
    
    // Set filters based on searchCriteria passed from Hero
    if (searchCriteria) {
      setSelectedReligion(searchCriteria.religion || "");
      if (searchCriteria.community) {
        setSelectedCaste(searchCriteria.community);
      }
      setSelectedGender(searchCriteria.gender === "Man" ? "Female" : "Male");
      setAgeRange({
        min: parseInt(searchCriteria.minAge) || 18,
        max: parseInt(searchCriteria.maxAge) || 40
      });
      // Show the filters automatically if we have search criteria
      setShowFilters(true);
    }
    
    // Handle filters from ProfileCategories component
    if (filterType && filterValue) {
      switch(filterType) {
        case 'community':
          setSelectedCaste(filterValue);
          break;
        case 'city':
          setSelectedCity(filterValue);
          break;
        case 'state':
          setSelectedState(filterValue);
          break;
        case 'motherTongue':
          setSelectedMotherTongue(filterValue);
          break;
      }
      // Show filters automatically
      setShowFilters(true);
    }
  }, [searchParams, searchCriteria, filterType, filterValue, isLoggedIn]);

  useEffect(() => {
    // Filter profiles based on selected criteria
    let filtered = [...dummyProfiles];
    
    if (selectedReligion && selectedReligion !== "all-religions") {
      filtered = filtered.filter(profile => profile.religion.toLowerCase() === selectedReligion.toLowerCase());
    }
    
    if (selectedCaste && selectedCaste !== "all-communities") {
      filtered = filtered.filter(profile => profile.caste.toLowerCase() === selectedCaste.toLowerCase());
    }
    
    if (ageRange.min && ageRange.max) {
      filtered = filtered.filter(profile => 
        profile.age >= ageRange.min && profile.age <= ageRange.max
      );
    }
    
    // Filter by gender if set
    if (selectedGender) {
      // This would filter by gender if the profile data included gender
    }
    
    // Filter by city
    if (selectedCity && selectedCity !== "all-cities") {
      filtered = filtered.filter(profile => 
        profile.location.toLowerCase().includes(selectedCity.toLowerCase())
      );
    }
    
    // Filter by state
    if (selectedState && selectedState !== "all-states") {
      filtered = filtered.filter(profile => 
        profile.location.toLowerCase().includes(selectedState.toLowerCase())
      );
    }
    
    // Filter by mother tongue (would need to add this to profile data)
    if (selectedMotherTongue && selectedMotherTongue !== "all-languages") {
      // This would filter by mother tongue if the profile data included it
    }
    
    setFilteredProfiles(filtered);
    setPage(1); // Reset pagination when filters change
    setHasMore(true);
  }, [selectedReligion, selectedCaste, ageRange, selectedGender, selectedCity, selectedState, selectedMotherTongue]);

  // Handle pagination for infinite scroll
  useEffect(() => {
    setLoading(true);
    const startIndex = 0;
    const endIndex = page * PROFILES_PER_PAGE;
    const newProfiles = filteredProfiles.slice(startIndex, endIndex);
    
    setVisibleProfiles(newProfiles);
    setHasMore(endIndex < filteredProfiles.length);
    setLoading(false);
  }, [filteredProfiles, page]);

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-16">
      <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-0">
            <span className="text-primary">Browse</span> <span className="text-secondary">Profiles</span>
          </h1>
          
          <Button 
            variant="outline" 
            className="flex items-center gap-2 border-primary text-primary"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>
        
        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="religion-filter">Religion</Label>
                <Select 
                  value={selectedReligion} 
                  onValueChange={(value) => {
                    setSelectedReligion(value);
                    setSelectedCaste("");
                  }}
                >
                  <SelectTrigger id="religion-filter">
                    <SelectValue placeholder="Select Religion" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-religions">All Religions</SelectItem>
                    {religionOptions.map((religion) => (
                      <SelectItem key={religion} value={religion}>
                        {religion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {selectedReligion && (
                <div className="space-y-2">
                  <Label htmlFor="caste-filter">Community</Label>
                  <Select 
                    value={selectedCaste} 
                    onValueChange={setSelectedCaste}
                  >
                    <SelectTrigger id="caste-filter">
                      <SelectValue placeholder="Select Community" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all-communities">All Communities</SelectItem>
                      {casteOptions[selectedReligion]?.map((caste) => (
                        <SelectItem key={caste} value={caste}>
                          {caste}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="city-filter">City</Label>
                <Select
                  value={selectedCity}
                  onValueChange={setSelectedCity}
                >
                  <SelectTrigger id="city-filter">
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-cities">All Cities</SelectItem>
                    {cityOptions.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="state-filter">State</Label>
                <Select
                  value={selectedState}
                  onValueChange={setSelectedState}
                >
                  <SelectTrigger id="state-filter">
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-states">All States</SelectItem>
                    {stateOptions.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="language-filter">Mother Tongue</Label>
                <Select
                  value={selectedMotherTongue}
                  onValueChange={setSelectedMotherTongue}
                >
                  <SelectTrigger id="language-filter">
                    <SelectValue placeholder="Select Mother Tongue" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all-languages">All Languages</SelectItem>
                    {motherTongueOptions.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
        
        {/* Profiles Grid */}
        {visibleProfiles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleProfiles.map((profile, index) => {
              if (visibleProfiles.length === index + 1) {
                return (
                  <div ref={lastProfileElementRef} key={profile.id}>
                    <ProfileCard {...profile} index={index} />
                  </div>
                );
              } else {
                return (
                  <ProfileCard 
                    key={profile.id} 
                    {...profile}
                    index={index}
                  />
                );
              }
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No profiles found matching your criteria.</p>
          </div>
        )}
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center my-8">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Profiles;
