
import { useRef, useState, useEffect } from 'react';
import { 
  CheckCircle, 
  Shield, 
  Search, 
  Heart 
} from "lucide-react";

const WhyChooseUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const features = [
    {
      icon: <CheckCircle className="h-12 w-12 text-gold" />,
      title: "High Success Rate",
      description: "Our platform has helped thousands of couples find their perfect life partners with a success rate of over 85%."
    },
    {
      icon: <Shield className="h-12 w-12 text-gold" />,
      title: "Verified Profiles",
      description: "We verify all profiles to ensure authenticity and safety, giving you peace of mind during your search."
    },
    {
      icon: <Search className="h-12 w-12 text-gold" />,
      title: "Comprehensive Matching",
      description: "Our advanced matching algorithm considers religion, caste, interests, and values for compatible matches."
    },
    {
      icon: <Heart className="h-12 w-12 text-gold" />,
      title: "User-Friendly Experience",
      description: "Our intuitive interface makes it easy to find, connect, and communicate with potential matches."
    }
  ];

  return (
    <section 
      ref={sectionRef} 
      className="py-16 px-4 bg-white"
      id="why-choose-us"
    >
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Why Choose <span className="text-gold">KSR</span> <span className="text-maroon">Matrimony</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg p-6 text-center shadow-md border border-gold/10 hover:shadow-lg transition-all duration-300 transform ${
                isVisible ? 'animate-fade-in opacity-100' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-maroon">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
