
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [showFirstImage, setShowFirstImage] = useState(false);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [showThirdImage, setShowThirdImage] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  
  // Search form state
  const [searchCriteria, setSearchCriteria] = useState({
    gender: "Woman",
    minAge: "18",
    maxAge: "40",
    religion: "Hindu",
    community: "Kamma"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate('/profiles', { 
      state: { 
        searchCriteria: searchCriteria
      }
    });
  };

  useEffect(() => {
    // Title animation
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 500);
    
    // First image animation
    const firstImageTimer = setTimeout(() => {
      setShowFirstImage(true);
    }, 1500);
    
    // Second image animation
    const secondImageTimer = setTimeout(() => {
      setShowSecondImage(true);
    }, 1800);
    
    // Third image animation
    const thirdImageTimer = setTimeout(() => {
      setShowThirdImage(true);
    }, 2100);
    
    // Search form animation
    const searchFormTimer = setTimeout(() => {
      setShowSearchForm(true);
    }, 1500);
    
    return () => {
      clearTimeout(titleTimer);
      clearTimeout(firstImageTimer);
      clearTimeout(secondImageTimer);
      clearTimeout(thirdImageTimer);
      clearTimeout(searchFormTimer);
    };
  }, []);

  return (
    <div className="relative min-h-[80vh] bg-[url('https://images.unsplash.com/photo-1505428215601-90f0007b9e83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex flex-col items-center justify-center overflow-hidden px-4 py-16 before:content-[''] before:absolute before:inset-0 before:bg-black/60">      
      <div className="container mx-auto z-10 text-white">
        {/* Main title animation */}
        <div 
          className={`text-center mb-12 transition-all duration-1000 ease-in-out transform ${
            showTitle 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 -translate-y-24'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            KSR Matrimony
          </h1>
          <p className="text-xl">Find Your Perfect Match</p>
        </div>
        
        {/* Couple Images Section */}
        <div className="flex justify-center space-x-8 mb-12">
          <div 
            className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${
              showFirstImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop" 
              alt="Couple 1" 
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${
              showSecondImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?q=80&w=387&auto=format&fit=crop" 
              alt="Couple 2" 
              className="w-full h-full object-cover"
            />
          </div>
          <div 
            className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${
              showThirdImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src="https://images.unsplash.com/photo-1623082574085-157d955f1d35?q=80&w=387&auto=format&fit=crop" 
              alt="Couple 3" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        {/* Search Filters */}
        <div 
          className={`max-w-5xl mx-auto mt-8 transition-all duration-1000 transform ${
            showSearchForm 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-24'
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Find Your Soulmate</h2>
          <form onSubmit={handleSearch}>
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-2">
                <div className="bg-white rounded-md p-1 text-xs text-gray-500">
                  <p className="mb-1 text-center">I'm looking for a</p>
                  <select 
                    className="w-full border-none focus:outline-none text-black text-sm p-1"
                    name="gender"
                    value={searchCriteria.gender}
                    onChange={handleInputChange}
                  >
                    <option>Woman</option>
                    <option>Man</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <div className="bg-white rounded-md p-1 text-xs text-gray-500">
                  <p className="mb-1 text-center">Aged</p>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="18" 
                      className="w-1/2 border-none focus:outline-none text-black text-sm p-1 text-center" 
                      name="minAge"
                      value={searchCriteria.minAge}
                      onChange={handleInputChange}
                    />
                    <span className="text-black self-center">-</span>
                    <input 
                      type="text" 
                      placeholder="40" 
                      className="w-1/2 border-none focus:outline-none text-black text-sm p-1 text-center" 
                      name="maxAge"
                      value={searchCriteria.maxAge}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="bg-white rounded-md p-1 text-xs text-gray-500">
                  <p className="mb-1 text-center">Religion</p>
                  <select 
                    className="w-full border-none focus:outline-none text-black text-sm p-1"
                    name="religion"
                    value={searchCriteria.religion}
                    onChange={handleInputChange}
                  >
                    <option>Hindu</option>
                    <option>Muslim</option>
                    <option>Christian</option>
                    <option>Sikh</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <div className="bg-white rounded-md p-1 text-xs text-gray-500">
                  <p className="mb-1 text-center">Community</p>
                  <select 
                    className="w-full border-none focus:outline-none text-black text-sm p-1"
                    name="community"
                    value={searchCriteria.community}
                    onChange={handleInputChange}
                  >
                    <option>Kamma</option>
                    <option>Reddy</option>
                    <option>Kapu</option>
                    <option>Brahmin</option>
                    <option>Yadav</option>
                    <option>Naidu</option>
                  </select>
                </div>
              </div>
              <div className="sm:col-span-2">
                <Button type="submit" className="w-full h-full bg-[#E91E63] hover:bg-[#FF4081] text-white rounded-md">
                  <Search className="mr-1 h-4 w-4" />
                  Let's Begin
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;
