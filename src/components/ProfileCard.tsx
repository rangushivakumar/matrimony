
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { Link } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose
} from "@/components/ui/dialog";

interface ProfileCardProps {
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
  index?: number;
  requiresLogin?: boolean;
}

const ProfileCard = ({ 
  id, 
  name, 
  age, 
  occupation, 
  height, 
  image, 
  religion, 
  caste, 
  location, 
  education = "Bachelor's Degree",
  hobbies = ["Reading", "Traveling", "Cooking"],
  about = "I am a kind-hearted person looking for a meaningful relationship. Family values are important to me, and I enjoy spending time with loved ones.",
  index = 0
}: ProfileCardProps) => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click from triggering
    
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "Removed from favorites" : "Added to favorites",
      description: isLiked ? `${name} has been removed from your favorites` : `${name} has been added to your favorites`
    });
  };

  const handleCardClick = () => {    
    setIsDialogOpen(true);
  };

  return (
    <>
      <div 
        className="card-profile animate-fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
        onClick={handleCardClick}
      >
        {/* Card Top - Image */}
        <div className="relative">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-64 object-cover"
          />
          <button 
            onClick={handleLikeClick}
            className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md z-10"
          >
            <Heart 
              size={18} 
              className={isLiked ? "fill-red-500 text-red-500" : "text-gray-400"} 
            />
          </button>
        </div>
        
        {/* Card Content */}
        <div className="p-4">
          <h3 className="font-semibold text-lg text-secondary">{name}, {age}</h3>
          <div className="mt-1 text-sm text-gray-500 space-y-1">
            <p>{occupation}</p>
            <p>{height} • {religion}, {caste}</p>
            <p>{location}</p>
          </div>
          
          <div className="mt-4 flex justify-between">
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary hover:text-white"
            >
              View Full Profile
            </Button>
          </div>
        </div>
      </div>
      
      {/* Profile Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold text-secondary">{name}'s Profile</DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <img 
                src={image} 
                alt={name} 
                className="w-full rounded-lg object-cover max-h-[350px]"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-xl">{name}, {age}</h3>
                <p className="text-gray-600">{occupation}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Height:</span>
                  <span>{height}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Religion:</span>
                  <span>{religion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Caste:</span>
                  <span>{caste}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Location:</span>
                  <span>{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Education:</span>
                  <span>{education}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="font-medium text-lg">About</h4>
              <p className="text-gray-600">{about}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-lg">Hobbies & Interests</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {hobbies.map((hobby, idx) => (
                  <span key={idx} className="bg-accent px-3 py-1 rounded-full text-sm">
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4 space-x-3">
            <Button
              variant="outline"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "border-red-500 text-red-500" : ""}
            >
              {isLiked ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
            <Button className="bg-primary">Contact</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileCard;
