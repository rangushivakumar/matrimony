
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

type Category = {
  title: string;
  filterType: string;
  options: string[];
}

const categories: Category[] = [
  {
    title: "Community",
    filterType: "community",
    options: ["Kamma", "Reddy", "Kapu", "Brahmin", "Yadav", "Naidu", "Raju", "Velama"]
  },
  {
    title: "City",
    filterType: "city",
    options: ["Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata", "Hyderabad", "Pune", "Ahmedabad"]
  },
  {
    title: "State",
    filterType: "state",
    options: ["Maharashtra", "Tamil Nadu", "Karnataka", "Delhi", "West Bengal", "Telangana", "Gujarat", "Kerala"]
  },
  {
    title: "Mother Tongue",
    filterType: "motherTongue",
    options: ["Telugu", "Tamil", "Hindi", "Malayalam", "Kannada", "Bengali", "Marathi", "Gujarati"]
  }
];

const ProfileCategories = () => {
  const navigate = useNavigate();
  
  const handleFilterClick = (filterType: string, filterValue: string) => {
    navigate('/profiles', { 
      state: { 
        filterType: filterType,
        filterValue: filterValue
      } 
    });
  };
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8 text-[#E91E63]">
          Explore Matrimonial Profiles By
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow border-[#E91E63]/20">
              <div className="bg-gradient-to-r from-[#E91E63]/10 to-[#9C27B0]/5 px-4 py-3">
                <h3 className="font-medium text-[#E91E63]">{category.title}</h3>
              </div>
              <div className="p-4">
                <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {category.options.map((option, idx) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E91E63] mr-2"></span>
                      <button 
                        onClick={() => handleFilterClick(category.filterType, option)}
                        className="hover:text-[#E91E63] transition-colors"
                      >
                        {option}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileCategories;
