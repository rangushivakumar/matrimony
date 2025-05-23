import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ownerprofile  from  '../assets/ownerprofile.jpeg'
import userphoto from '../assets/userphoto.jpeg'
import license from '../assets/license.jpeg'
import profilebanner from '../assets/profilebanner.jpeg'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto py-12 px-4 mt-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          <span className="text-[#00bcd4]">About</span> <span className="text-[#E91E63]">KSR Matrimony</span>
        </h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          <div className="mb-12">
            <p className="text-lg leading-relaxed text-gray-700">
              KSR Matrimony is one of India's leading matrimonial services, dedicated to helping individuals find their perfect life partner. Founded in 2012, we have successfully connected thousands of couples who are now enjoying happy marriages.
            </p>
          </div>
          
          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[#00bcd4]/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-[#E91E63]">Our Mission</h2>
              <p className="text-gray-700">
                To provide a trusted platform where individuals can find their ideal life partner based on their preferences, values, and compatibility, leading to happy and fulfilling marriages.
              </p>
            </div>
            
            <div className="bg-[#E91E63]/10 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-[#E91E63]">Our Vision</h2>
              <p className="text-gray-700">
                To be the most trusted matrimonial service in India, known for our integrity, personalized matchmaking, and commitment to helping people find their perfect match.
              </p>
            </div>
          </div>
          
          {/* Our Story */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-[#E91E63]">Our Story</h2>
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64 md:h-auto">
                  <img 
                    // src="https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?q=80&w=2940&auto=format&fit=crop" 
                    src={ownerprofile}
                    alt="KSR Matrimony Office" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 mt-20">
                  <p className="text-gray-700">
                    KSR Matrimony was founded by Kasu Srinivas Reddy in 2012 with a simple mission - to help people find compatible life partners while respecting their cultural values and preferences.
                  </p>
                  <p className="text-gray-700 mt-4">
                    What started as a small matchmaking service in Warangal has now grown into one of the most trusted matrimonial platforms in India, connecting thousands of singles across different religions, castes, and communities.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Our Values */}
          <div className="mb-12">
            <h2 className="text-3xl font-semibold mb-6 text-[#E91E63]">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#00bcd4]">
                <h3 className="text-xl font-semibold mb-2">Trust</h3>
                <p className="text-gray-700">
                  We verify all profiles to ensure authenticity and build trust among our users.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#E91E63]">
                <h3 className="text-xl font-semibold mb-2">Respect</h3>
                <p className="text-gray-700">
                  We respect cultural values, preferences, and privacy of our members.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-[#00bcd4]">
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in our service and customer support.
                </p>
              </div>
            </div>
          </div>
          
         
          <div>
            <h2 className="text-3xl font-semibold mb-6 text-[#E91E63]">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  // src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?q=80&w=2952&auto=format&fit=crop" 
                  src={userphoto}
                  alt="Kasu Srinivas Reddy" 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold">Kasu Srinivas Reddy</h3>
                  <p className="text-[#00bcd4]">Founder & CEO</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  // src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2961&auto=format&fit=crop" 
                  src={profilebanner}
                  alt="Priya Sharma" 
                  className="w-full h-48 object-cover"
                />
                {/* <div className="p-4">
                  <h3 className="text-xl font-semibold">Priya Sharma</h3>
                  <p className="text-[#00bcd4]">Chief Matchmaker</p>
                </div> */}
                 <div className="p-4">
                  <h3 className="text-xl font-semibold">Kasu Srinivas Reddy</h3>
                  <p className="text-[#00bcd4]">Founder & CEO</p>
                </div>
              </div>
              
              <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <img 
                  // src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2874&auto=format&fit=crop" 
                  src = {license}
                  alt="Raj Kumar" 
                  className="w-full h-48 object-cover"
                />
                {/* <div className="p-4">
                  <h3 className="text-xl font-semibold">Raj Kumar</h3>
                  <p className="text-[#00bcd4]">Customer Success Manager</p>
                </div> */}
                 <div className="p-4">
                  <h3 className="text-xl font-semibold">Kasu Srinivas Reddy</h3>
                  <p className="text-[#00bcd4]">Founder & CEO</p>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
