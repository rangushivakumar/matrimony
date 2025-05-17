import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  education: string;
  occupation: string;
  address: string;
  caste: string;
  imageUrl: string;
}

const MatchingProfiles = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const auth = getAuth();
  const navigate = useNavigate();

  const fallbackProfiles: Profile[] = [
    {
      id: '1',
      name: 'Priya Sharma',
      age: 28,
      location: 'Mumbai, Maharashtra',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop',
      education: 'MBA',
      occupation: 'Marketing Manager',
      address:'Warangal',
      caste:'BC-B(KAMSALI)'
    },
    {
      id: '2',
      name: 'Rahul Patel',
      age: 30,
      location: 'Delhi, NCR',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop',
      education: 'B.Tech',
      occupation: 'Software Engineer',
      address:'Warangal',
      caste:'BC-B(KAMSALI)'
    },
    {
      id: '3',
      name: 'Ananya Reddy',
      age: 26,
      location: 'Bangalore, Karnataka',
      imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop',
      education: 'MD',
      occupation: 'Doctor',
      address:'Warangal',
      caste:'BC-B(KAMSALI)'
    },
    {
      id: '4',
      name: 'Vikram Singh',
      age: 32,
      location: 'Chennai, Tamil Nadu',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop',
      education: 'CA',
      occupation: 'Chartered Accountant',
      address:'Warangal',
      caste:'BC-B(KAMSALI)'
    },
    {
      id: '5',
      name: 'Meera Joshi',
      age: 27,
      location: 'Pune, Maharashtra',
      imageUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop',
      education: 'MSc',
      occupation: 'Research Scientist', 
      address:'Warangal',
      caste:'BC-B(KAMSALI)'
      
    },
    {
      id: '6',
      name: 'Arjun Kumar',
      age: 29,
      location: 'Hyderabad, Telangana',
      imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop',
      education: 'LLB',
      occupation: 'Lawyer',
      address:'Warangal',
      caste:'BC-B(KAMSALI)'
    }
  ];

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const user = auth.currentUser;
        console.log('Current user:', user);
        
        // if (user) {
        //   console.log('Fetching matching profiles for user:', user.uid);
        //   const response = await fetch(`https://apimatrimony.lytortech.com/api/profiles/get/by-caste/${user.uid}`);
        //   console.log('API Response status:', response.status);
          
        //   if (response.ok) {
        //     const data = await response.json();
        //     console.log('API Response data:', data);
        //     if (data.profiles && Array.isArray(data.profiles) && data.profiles.length > 0) {
        //       setProfiles(data.profiles);
        //       setMessage(data.message || '');
        //     }
        //   }
        // }

        if (user) {
            console.log('Fetching profiles for user:', user.uid);
            const response = await fetch(`https://apimatrimony.lytortech.com/api/profiles/get/by-caste/${user.uid}`);
            console.log('API Response status:', response.status);
            
            if (response.ok) {
              const data = await response.json();
              console.log('API Response data:', data);
              if (data.profiles && Array.isArray(data.profiles) && data.profiles.length > 0) {
                // setShowProfiles(true);
                setProfiles(data.profiles);
                setMessage(data.message || '');
              } else {
                console.log('No profiles in response, using fallback');
                setProfiles(fallbackProfiles);
              }
            } else {
              console.log('API request failed, using fallback profiles');
              setProfiles(fallbackProfiles);
            }
          } else {
            console.log('No user found, using fallback profiles');
            setProfiles(fallbackProfiles);
          }
      } catch (error) {
        console.error('Error fetching matching profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [auth]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="w-16 h-16 border-4 border-[#00bcd4] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="py-8 px-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-[#ff5252] text-center sm:text-left">
            Matching Profiles
          </h2>
          <Button 
            className="bg-[#ff5252] hover:bg-[#ff5252]/90 text-white px-4 sm:px-6 py-2 rounded-full transition-all duration-300 w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            Back to Featured Profiles
          </Button>
        </div>
        
        {message && (
          <h6 className="font-semibold text-center mb-8 text-[#ff5252] text-sm sm:text-base">
            {message}
          </h6>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {profiles.map((profile) => (
            <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative h-60 sm:h-80 w-full">
                <img 
                  src={profile.imageUrl} 
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg sm:text-xl font-semibold">{profile.name}</h3>
                </div>
              </div>
              <CardContent className="p-4 sm:p-6">
                <div className="space-y-2">
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm">{profile.caste}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-xs sm:text-sm">{profile.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                    <span className="text-xs sm:text-sm">{profile.education}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                    <span className="text-xs sm:text-sm">{profile.occupation}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingProfiles; 