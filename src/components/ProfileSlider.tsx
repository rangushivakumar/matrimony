
import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileCard from './ProfileCard';
import { Link } from 'react-router-dom';
import { dummyProfiles } from '../data/profiles';

interface ProfileSliderProps {
  selectedCaste?: string;
}

const ProfileSlider = ({ selectedCaste }: ProfileSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // Filter profiles by selected caste if provided
  const filteredProfiles = selectedCaste 
    ? dummyProfiles.filter(profile => 
        profile.caste.toLowerCase() === selectedCaste.toLowerCase()
      ) 
    : dummyProfiles;
  
  const nextSlide = () => {
    if (currentIndex < filteredProfiles.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Number of items to display
  const itemsToShow = 3;
  
  return (
    <div className="py-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            <span className="text-primary">Browse</span> {selectedCaste ? `${selectedCaste} ` : ''}
            <span className="text-secondary">Profiles</span>
          </h2>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="border-primary text-primary"
              onClick={prevSlide}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="border-primary text-primary"
              onClick={nextSlide}
              disabled={currentIndex >= filteredProfiles.length - itemsToShow}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        <div ref={sliderRef} className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
          >
            {filteredProfiles.map((profile, index) => (
              <div key={profile.id} className="min-w-[calc(33.33%-1rem)] flex-shrink-0">
                <ProfileCard 
                  {...profile} 
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlider;
