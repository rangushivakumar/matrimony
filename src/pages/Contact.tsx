
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactUs from '@/components/ContactUs';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto py-12 px-4 mb-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          <span className="text-primary">Contact</span> <span className="text-secondary">Us</span>
        </h1>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-lg text-gray-700">
            Have questions about our services or need assistance finding your perfect match? 
            Our dedicated team is here to help you every step of the way.
          </p>
        </div>
      </div>
      
      <ContactUs />
      
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6 text-secondary text-center">Visit Our Office</h2>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-80 w-full">
              <img 
                src="https://images.unsplash.com/photo-1546636889-ba9fdd63583e?q=80&w=3272&auto=format&fit=crop" 
                alt="Office Location" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">KSR Matrimony Headquarters</h3>
              <p className="text-gray-700">
                KSR Tower, 123 Main Street<br />
                Chennai, Tamil Nadu 600001<br />
                India
              </p>
              <p className="mt-4 text-gray-700">
                <span className="font-semibold">Business Hours:</span><br />
                Monday - Saturday: 9:00 AM - 8:00 PM<br />
                Sunday: 10:00 AM - 4:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
