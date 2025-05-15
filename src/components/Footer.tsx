import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSuccessStories = () => {
    const successStoriesSection = document.getElementById('success-stories');
    if (successStoriesSection) {
      successStoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <footer className="bg-[#f8f8f8] text-gray-700">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={scrollToTop}
                  className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <button 
                  onClick={scrollToSuccessStories}
                  className="text-gray-600 hover:text-primary transition-colors cursor-pointer"
                >
                  Success Stories
                </button>
              </li>
              {/* <li>
                <Link to="/profiles" className="text-gray-600 hover:text-primary transition-colors">
                  Browse Profiles
                </Link>
              </li> */}
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li className="pt-2 flex space-x-4">
                <a 
                  href="https://www.instagram.com/srinivarreddykasu?igsh=MnB5dnphenNjZm5l&utm_source=qr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="https://www.facebook.com/share/1APYhTr4dW/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary transition-colors"
                >
                  <Twitter size={18} />
                </a>
              </li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-gray-600">Free Profile Creation</li>
              <li className="text-gray-600">Premium Membership</li>
              <li className="text-gray-600">Background Verification</li>
              <li className="text-gray-600">Personalized Matchmaking</li>
              <li className="text-gray-600">Wedding Planning Assistance</li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-primary mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone size={18} className="text-primary mr-2" />
                <span className="text-gray-600">+91 7075929888</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-primary mr-2" />
                <span className="text-gray-600">ksrservices7@gmail.com </span>
              </li>
              <li className="text-gray-600">
                న్యూ బస్టాండ్ రోడ్ 
                పద్మాక్షి సర్కిల్ హనుమాన్ గుడి బ్యాక్ సైడ్ 
                <br />
                house no 6-2-324 na Machilibazar
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <div className="mb-2">
            <Link to="/terms" className="hover:text-primary transition-colors mx-2">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-primary transition-colors mx-2">
              Privacy Policy
            </Link>
          </div>
          <p>© {year} KSR Matrimony. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
