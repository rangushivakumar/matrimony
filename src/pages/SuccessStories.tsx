
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Heart } from 'lucide-react';

interface SuccessStory {
  id: number;
  image: string;
  maleName: string;
  femaleName: string;
  weddingDate: string;
  location: string;
  story: string;
}

const successStories: SuccessStory[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1622075361371-bffdc61aeeeb?q=80&w=3870&auto=format&fit=crop",
    maleName: "Rahul",
    femaleName: "Priya",
    weddingDate: "June 15, 2023",
    location: "Mumbai, India",
    story: "We connected on KSR Matrimony in January 2022. After months of conversations and a few meetings, we knew we were perfect for each other. Our families met, and we got married in a beautiful ceremony in Mumbai. Thank you, KSR Matrimony, for bringing us together!"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=3870&auto=format&fit=crop",
    maleName: "Aditya",
    femaleName: "Sneha",
    weddingDate: "November 22, 2023",
    location: "Delhi, India",
    story: "We both had specific preferences, and KSR Matrimony's detailed filters helped us find each other. After our first meeting, we knew there was something special. Six months later, we're happily married and grateful for KSR Matrimony's role in our love story."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=3870&auto=format&fit=crop",
    maleName: "Vikram",
    femaleName: "Meera",
    weddingDate: "February 8, 2023",
    location: "Bangalore, India",
    story: "Despite living in different cities, KSR Matrimony helped us connect. We spent months getting to know each other through calls and messages before meeting in person. When we finally met, it felt like we'd known each other forever. We're now married and building our life together."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=3870&auto=format&fit=crop",
    maleName: "Karan",
    femaleName: "Nisha",
    weddingDate: "April 3, 2023",
    location: "Chennai, India",
    story: "We had both been on several matrimonial sites without success. Within a month of joining KSR Matrimony, we found each other. Our values and life goals aligned perfectly. After a year of courtship, we tied the knot in a traditional ceremony in Chennai."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1519690889869-e705e59f72e1?q=80&w=3870&auto=format&fit=crop",
    maleName: "Arjun",
    femaleName: "Divya",
    weddingDate: "September 12, 2023",
    location: "Hyderabad, India",
    story: "Our families were registered on KSR Matrimony. When our profiles matched, our parents arranged a meeting. We hit it off immediately and knew we were meant for each other. Six months later, we had a beautiful wedding in Hyderabad surrounded by our loved ones."
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=3869&auto=format&fit=crop",
    maleName: "Rohan",
    femaleName: "Anjali",
    weddingDate: "July 29, 2023",
    location: "Jaipur, India",
    story: "We both had very specific preferences which made finding a match difficult. KSR Matrimony's detailed filtering system helped us find each other. After several meetings and introducing our families, we knew we had found our soulmate. We're now happily married and grateful to KSR Matrimony."
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2787&auto=format&fit=crop",
    maleName: "Varun",
    femaleName: "Deepika",
    weddingDate: "March 18, 2023",
    location: "Pune, India",
    story: "We were both looking for someone with similar values and interests. KSR Matrimony's matching algorithm suggested us to each other, and we immediately connected. After a few months of getting to know each other, we decided to take the next step. Our wedding was beautiful, and we're grateful to KSR Matrimony for bringing us together."
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1621874347142-f0faa5d578c7?q=80&w=2787&auto=format&fit=crop",
    maleName: "Sameer",
    femaleName: "Tanya",
    weddingDate: "October 5, 2023",
    location: "Ahmedabad, India",
    story: "Finding the right partner was challenging for both of us until we joined KSR Matrimony. The platform's user-friendly interface and extensive filters made the search process smooth. We connected, met several times, and realized we were perfect for each other. Our journey from strangers to soulmates was made possible by KSR Matrimony."
  }
];

const SuccessStories = () => {
  const [visibleStories, setVisibleStories] = useState<SuccessStory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    // Display stories with a staggered effect
    const timer = setTimeout(() => {
      setVisibleStories(successStories);
    }, 100);
    
    // Auto-scroll functionality
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % successStories.length);
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="bg-gradient-to-r from-[#E91E63]/30 to-[#FF4081]/30 py-16 px-4">
        <div className="container mx-auto text-center">
          <Heart className="mx-auto text-[#E91E63] h-16 w-16 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-[#FFC107]">Success</span> <span className="text-[#E91E63]">Stories</span>
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Real stories of couples who found their perfect match through KSR Matrimony. 
            Join us today and start writing your own love story.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-12">
          {visibleStories.map((story, index) => (
            <div 
              key={story.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-700 ${
                visibleStories.includes(story) ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 0.2}s` }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img 
                    src={story.image} 
                    alt={`${story.maleName} and ${story.femaleName}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#E91E63] mb-2">
                      {story.maleName} & {story.femaleName}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-4">
                      <span>{story.weddingDate}</span>
                      <span className="mx-2">•</span>
                      <span>{story.location}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-6">{story.story}</p>
                  
                  <div className="flex justify-center mt-auto">
                    <div className="inline-block px-4 py-2 border border-[#FFC107]/50 rounded-full text-sm text-[#FFC107]">
                      Happily Married
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-[#FFC107]/10 py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4 text-[#E91E63]">Share Your Success Story</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-8">
            Did you find your partner through KSR Matrimony? We'd love to hear from you and feature your story on our website.
          </p>
          <button 
            className="bg-[#FFC107] hover:bg-[#FFC107]/90 text-black px-8 py-4 rounded-full text-lg font-medium"
            onClick={() => window.location.href = '/contact'}
          >
            Submit Your Story
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessStories;
