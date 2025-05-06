
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import LoginModal from '@/components/LoginModal';
import Footer from '@/components/Footer';

const Login = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb] mt-16">
      <Navbar />
      <div className="py-16">
        <LoginModal />
      </div>
      <Footer />
    </div>
  );
};

export default Login;
