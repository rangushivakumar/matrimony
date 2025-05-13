import { useEffect } from 'react';
import LoginModal from '@/components/LoginModal';

const Login = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <div className="py-16">
        <LoginModal />
      </div>
    </div>
  );
};

export default Login;
