
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileCard from '@/components/ProfileCard';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

// Interface for profile data
interface Profile {
  id: number;
  name: string;
  age: number;
  occupation: string;
  height: string;
  image: string;
  religion: string;
  caste: string;
  location: string;
  education?: string;
  hobbies?: string[];
  about?: string;
}

// Interface for API response
interface ApiResponse {
  profiles: Profile[];
  message: string | null;
}

const MatchedProfiles = () => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Sample dummy profiles
  const dummyProfiles: Profile[] = [
    {
      id: 101,
      name: "Anjali Singh",
      age: 28,
      occupation: "Software Engineer",
      height: "5'6\"",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2788&auto=format&fit=crop",
      religion: "Hindu",
      caste: "Brahmin",
      location: "Bangalore",
      education: "Master's in Computer Science",
      hobbies: ["Reading", "Traveling", "Photography"],
      about: "I am a passionate software engineer who loves solving complex problems. I believe in work-life balance and enjoy exploring new places during my free time."
    },
    {
      id: 102,
      name: "Riya Patel",
      age: 26,
      occupation: "Doctor",
      height: "5'4\"",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop",
      religion: "Hindu",
      caste: "Patel",
      location: "Mumbai",
      education: "MBBS, MD",
      hobbies: ["Cooking", "Dancing", "Volunteering"],
      about: "As a doctor, I'm dedicated to helping others. I enjoy cooking different cuisines and learning new dance forms. I also volunteer at local health camps in my free time."
    },
    {
      id: 103,
      name: "Meera Sharma",
      age: 27,
      occupation: "Financial Analyst",
      height: "5'5\"",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2538&auto=format&fit=crop",
      religion: "Hindu",
      caste: "Sharma",
      location: "Delhi",
      education: "MBA in Finance",
      hobbies: ["Yoga", "Reading", "Hiking"],
      about: "I work in the finance sector and am passionate about investment strategies. I practice yoga regularly and enjoy reading non-fiction books. On weekends, I like going for hikes and connecting with nature."
    }
  ];

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    // Sample user ID - in a real app, this would come from your auth system
    const userId = "user123";
    
    // Fetch profiles function
    const fetchProfiles = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an actual API call
        // const response = await fetch(`/api/get/by-caste/${userId}`);
        // const data = await response.json();
        
        // For now, let's simulate different API responses
        const scenarios = [
          {
            profiles: dummyProfiles,
            message: "Please fill your profile form to see genuine matches"
          },
          {
            profiles: dummyProfiles,
            message: "Your profile is under verification. Showing sample matches"
          },
          {
            profiles: dummyProfiles,
            message: null
          }
        ];
        
        // Randomly select a scenario for demonstration
        const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
        
        // Simulate API delay
        setTimeout(() => {
          setData(randomScenario);
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        setError("Failed to fetch profiles. Please try again later.");
        setIsLoading(false);
        console.error("Error fetching profiles:", err);
      }
    };
    
    fetchProfiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-primary">Your</span> <span className="text-accent">Matches</span>
          </h1>
          <p className="text-gray-600">
            Profiles that match your preferences and requirements
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        ) : (
          <>
            {data?.message && (
              <Alert className="mb-8 border-primary/30 bg-primary/5">
                <InfoIcon className="h-4 w-4 text-primary" />
                <AlertDescription className="text-primary">
                  {data.message}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data?.profiles.map((profile, index) => (
                <ProfileCard 
                  key={profile.id} 
                  {...profile} 
                  index={index}
                  requiresLogin={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default MatchedProfiles;
