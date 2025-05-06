
import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface Couple {
  id: number;
  image: string;
  maleName: string;
  femaleName: string;
  location: string;
  testimonial: string;
}

const couples: Couple[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1621874347142-f0faa5d578c7?q=80&w=2787&auto=format&fit=crop",
    maleName: "Nitin",
    femaleName: "Karuna",
    location: "Delhi",
    testimonial: "We met through KSR Matrimony and instantly connected. After a few meetings, we knew we were meant for each other."
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=2787&auto=format&fit=crop",
    maleName: "Abhirav",
    femaleName: "Sakshi",
    location: "Mumbai",
    testimonial: "Finding a life partner was made easy by KSR Matrimony. Their matching system helped us find each other quickly."
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1519123472359-4b1dc8534c7a?q=80&w=2794&auto=format&fit=crop",
    maleName: "Shivajey",
    femaleName: "Mitali",
    location: "Bangalore",
    testimonial: "We're grateful to KSR Matrimony for their excellent service. They made our journey to marriage smooth and wonderful."
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1622075361371-bffdc61aeeeb?q=80&w=3870&auto=format&fit=crop",
    maleName: "Rahul",
    femaleName: "Priya",
    location: "Chennai",
    testimonial: "We connected on KSR Matrimony in January 2022. After months of conversations and a few meetings, we knew we were perfect for each other."
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?q=80&w=3870&auto=format&fit=crop",
    maleName: "Karan",
    femaleName: "Nisha",
    location: "Hyderabad",
    testimonial: "We had both been on several matrimonial sites without success. Within a month of joining KSR Matrimony, we found each other."
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?q=80&w=3870&auto=format&fit=crop",
    maleName: "Vikram",
    femaleName: "Meera",
    location: "Delhi",
    testimonial: "Despite living in different cities, KSR Matrimony helped us connect. We're now happily married and living our best life together."
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=3870&auto=format&fit=crop",
    maleName: "Arjun",
    femaleName: "Divya",
    location: "Mumbai",
    testimonial: "Our families were registered on KSR Matrimony. When our profiles matched, our parents arranged a meeting. We hit it off immediately."
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=3869&auto=format&fit=crop",
    maleName: "Rohan",
    femaleName: "Anjali",
    location: "Pune",
    testimonial: "We both had very specific preferences which made finding a match difficult. KSR Matrimony's detailed filtering system helped us find each other."
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1522058691919-f7148bef4dfe?q=80&w=3456&auto=format&fit=crop",
    maleName: "Sanjay",
    femaleName: "Neha",
    location: "Jaipur",
    testimonial: "We were introduced through KSR Matrimony and after a year of getting to know each other, we tied the knot in a beautiful ceremony."
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?q=80&w=3456&auto=format&fit=crop",
    maleName: "Aditya",
    femaleName: "Pooja",
    location: "Ahmedabad",
    testimonial: "KSR Matrimony helped us find the perfect match based on our values and interests. We couldn't be happier with our married life."
  },
  {
    id: 11,
    image: "https://images.unsplash.com/photo-1623940389538-bb62c3ad9d35?q=80&w=3456&auto=format&fit=crop",
    maleName: "Varun",
    femaleName: "Shreya",
    location: "Kolkata",
    testimonial: "After meeting through KSR Matrimony, we knew we were compatible. Our families approved, and we've been happily married for two years now."
  },
  {
    id: 12,
    image: "https://images.unsplash.com/photo-1595982828248-1cf19ce342bb?q=80&w=3456&auto=format&fit=crop",
    maleName: "Rajesh",
    femaleName: "Anita",
    location: "Lucknow",
    testimonial: "We are thankful to KSR Matrimony for bringing us together. The matching algorithm really works and found us our soulmates!"
  }
];

const RecentClients = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Determine how many stories to show per slide based on screen size
  const storiesPerSlide = isMobile ? 1 : 3;
  const totalSlides = Math.ceil(couples.length / storiesPerSlide);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // Auto-scroll functionality - every 5 seconds
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setActiveDot((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setActiveDot((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setActiveDot(index);
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-16 px-4 bg-white"
      id="success-stories"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-12 text-[#E91E63]">
          Matrimony Service with Millions of Success Stories
        </h2>
        
        <div className={`max-w-6xl mx-auto relative ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-10">
            <Button 
              onClick={prevSlide}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-100 text-[#E91E63]"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute top-1/2 -right-4 -translate-y-1/2 z-10">
            <Button 
              onClick={nextSlide}
              variant="outline" 
              size="icon"
              className="rounded-full bg-white shadow-md hover:bg-gray-100 text-[#E91E63]"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
          
          {/* Slider Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full">
                  <div className={`grid grid-cols-1 ${!isMobile ? 'md:grid-cols-3' : ''} gap-6`}>
                    {couples
                      .slice(slideIndex * storiesPerSlide, slideIndex * storiesPerSlide + storiesPerSlide)
                      .map((couple) => (
                        <div 
                          key={couple.id}
                          className="bg-white rounded-lg overflow-hidden shadow border hover:shadow-md transition-shadow mx-auto max-w-sm md:max-w-full"
                        >
                          <div className="aspect-square overflow-hidden">
                            <img 
                              src={couple.image} 
                              alt={`${couple.maleName} and ${couple.femaleName}`} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="font-medium text-lg mb-1">
                              {couple.maleName} & {couple.femaleName}
                            </h3>
                            <p className="text-sm text-[#009688] mb-3">{couple.location}</p>
                            <p className="text-sm text-gray-700 line-clamp-3">{couple.testimonial}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Dots navigation */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, dot) => (
              <button
                key={dot}
                onClick={() => goToSlide(dot)}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  activeDot === dot ? 'bg-[#E91E63]' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-[#E91E63] text-white py-10 mt-16">
        <div className="container mx-auto text-center">
          <p className="text-xl mb-4">Your story is waiting to happen!</p>
          <Button className="bg-white text-[#E91E63] hover:bg-gray-100">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentClients;
