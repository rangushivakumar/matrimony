
import { useState, useEffect } from 'react';
import { Edit, Users, MessageCircle } from 'lucide-react';

const FeatureSteps = () => {
  const [isVisible, setIsVisible] = useState(false);
  
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

    const element = document.getElementById('feature-steps');
    if (element) {
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      icon: <Edit className="h-12 w-12 text-[#00bcd4]" />,
      title: "Sign Up",
      description: "Register for free & create your detailed profile & add photos"
    },
    {
      icon: <Users className="h-12 w-12 text-[#00bcd4]" />,
      title: "Connect",
      description: "Search & Find potential matches that suit your preferences"
    },
    {
      icon: <MessageCircle className="h-12 w-12 text-[#00bcd4]" />,
      title: "Interact",
      description: "Start a conversation & begin your journey to find a life partner"
    }
  ];

  return (
    <section 
      id="feature-steps"
      className="py-12 px-4 bg-white"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-12 text-[#ff5252]">
          Find your Special Someone
        </h2>
        
        <div className="flex flex-wrap justify-center gap-12 md:gap-20">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`text-center max-w-[200px] ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex justify-center items-center mb-4 mx-auto h-24 w-24 rounded-full border-2 border-[#00bcd4]">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-2 text-[#00bcd4]">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSteps;
