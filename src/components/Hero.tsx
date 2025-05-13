import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
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
    const profilesSection = document.getElementById('profiles-section');
    if (profilesSection) {
      profilesSection.scrollIntoView({ behavior: 'smooth' });
    }
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
            showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-24'
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
            className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${showFirstImage ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              // src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format&fit=crop"
              src='https://akm-img-a-in.tosshub.com/sites/cosmo/sites/default/files/inline-images/2_155.png?wJf6rhJGFYR3ZTG08MtDvHIWJQroarph'
              alt="Couple 1"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${showSecondImage ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src="https://images.pexels.com/photos/28405681/pexels-photo-28405681/free-photo-of-stunning-indian-bride-in-traditional-wedding-attire.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt="Couple 2"
              className="w-full h-full object-cover"
            />
          </div>
          <div
            className={`w-32 h-32 md:w-40 md:h-40 bg-white rounded-lg overflow-hidden shadow-lg transition-opacity duration-1000 ${showThirdImage ? 'opacity-100' : 'opacity-0'
              }`}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4gISxNuyPgdprwCK1EzQ0ZfhPbNnmTGwUtUGplX5Iaw&s&ec=72940543"
              alt="Couple 3"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Search Filters */}
        <div
          className={`max-w-5xl mx-auto mt-8 transition-all duration-1000 transform ${
            showSearchForm ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
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
                    <option>BC-A (Munnur Kapu)</option>
                    <option>BC-A (Goud)</option>
                    <option>BC-A (Gangaputra / Jalari)</option>
                    <option>BC-A (Kummari)</option>
                    <option>BC-A (Vaddera)</option>
                    <option>BC-A (Besta)</option>
                    <option>BC-A (Are / Arey Kshatriya)</option>
                    <option>BC-A (Kuruba)</option>
                    <option>BC-A (Rajaka)</option>
                    <option>BC-A (Kamsali)</option>
                    <option>BC-A (Sagara / Uppara)</option>
                    <option>BC-B (Patel)</option>
                    <option>BC-B (Yadav / Golla)</option>
                    <option>BC-B (Mudiraj / Mutrasi)</option>
                    <option>BC-B (Goud)</option>
                    <option>BC-B (Gandla)</option>
                    <option>BC-B (Kuruma)</option>
                    <option>BC-B (Koppula Velama)</option>
                    <option>BC-B (Thogata Veera Kshatriya)</option>
                    <option>BC-B (Are Katikam / Kapu)</option>
                    <option>BC-C (Christian)</option>
                    <option>BC-D (Kapu)</option>
                    <option>BC-D (Telaga)</option>
                    <option>BC-D (Balija)</option>
                    <option>BC-D (Ontari)</option>
                    <option>BC-D (Munnuru Kapu)</option>
                    <option>BC-D (Kamma)</option>
                    <option>BC-D (Reddy)</option>
                    <option>BC-D (Velama)</option>
                    <option>BC-E (Shaik)</option>
                    <option>BC-E (Syed)</option>
                    <option>BC-E (Moghal)</option>
                    <option>BC-E (Pathan)</option>
                    <option>BC-E (Qureshi / Butcher)</option>
                    <option>BC-E (Labbi)</option>
                    <option>BC-E (Mehtar)</option>
                    <option>BC-E (Ansari)</option>
                    <option>SC (Madiga)</option>
                    <option>SC (Mala)</option>
                    <option>SC (Relli)</option>
                    <option>SC (Dommara / Dombar)</option>
                    <option>SC (Chakkiliyan / Rajaka)</option>
                    <option>SC (Pakir / Faqir)</option>
                    <option>SC (Bindla)</option>
                    <option>SC (Budaga Jangam)</option>
                    <option>SC (Vamsha Raj)</option>
                    <option>SC (Poosala)</option>
                    <option>SC (Valluvan)</option>
                    <option>SC (Boya)</option>
                    <option>SC (Thoti)</option>
                    <option>SC (Adi Andhra)</option>
                    <option>SC (Adi Dravida)</option>
                    <option>SC (Arunthathiyar)</option>
                    <option>ST (Lambada / Banjara / Sugali)</option>
                    <option>ST (Gond)</option>
                    <option>ST (Koya)</option>
                    <option>ST (Chenchu)</option>
                    <option>ST (Yerukala)</option>
                    <option>ST (Yanadi)</option>
                    <option>ST (Konda Reddy)</option>
                    <option>ST (Konda Dora)</option>
                    <option>ST (Savara)</option>
                    <option>ST (Jatapu)</option>
                    <option>ST (Kammara)</option>
                    <option>ST (Valmiki / Boya)</option>
                    <option>ST (Gadaba)</option>
                    <option>ST (Hill Reddi)</option>
                    <option>ST (Kolam)</option>
                    <option>ST (Thoti)</option>
                    <option>ST (Porja)</option>
                    <option>ST (Bagata)</option>
                    <option>ST (Andh)</option>
                    <option>OC (OC)</option>
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
