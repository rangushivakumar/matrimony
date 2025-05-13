import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, LogIn, LogOut, Home, Menu, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { app } from '@/config/firebaseConfig';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const auth = getAuth(app);
  const { toast } = useToast();
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY > 10;
      setIsScrolled(scrollPosition);
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    
    return () => {
      document.removeEventListener("scroll", handleScroll);
      unsubscribe(); // Cleanup auth state subscription
    };
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      toast({
        title: "Error logging out",
        description: "There was a problem logging out. Please try again.",
        variant: "destructive",
      });
    }
  };

  const navbarBgClass = isHomePage 
    ? isScrolled 
      ? 'backdrop-blur-md bg-white/70 shadow-sm' 
      : 'bg-transparent'
    : 'backdrop-blur-md bg-white/70 shadow-sm';

  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-gray-700';
  const logoTextClass = isHomePage && !isScrolled ? 'text-[#E91E63]' : 'text-[#E91E63]';
  const logoSubTextClass = isHomePage && !isScrolled ? 'text-purple' : 'text-purple';
  const navbarMarginClass = isHomePage ? '' : 'mb-16';

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    const baseClass = `hidden md:flex items-center transition-colors duration-200 ${textColor}`;
    const activeClass = isActive(path) 
      ? 'font-semibold text-[#00bcd4] border-b-2 border-[#00bcd4]' 
      : 'hover:text-[#00bcd4]';
    return `${baseClass} ${activeClass}`;
  };

  return (
    <nav 
      className={`fixed top-0 z-50 w-full py-3 px-4 md:px-6 transition-all duration-300 ${navbarBgClass} ${navbarMarginClass}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className={`font-playfair text-2xl font-bold ${logoTextClass}`}>KSR</div>
          <span className={`font-semibold ${logoSubTextClass}`}>Matrimony</span>
        </Link>
        
        <div className="flex items-center space-x-6">
          <Link to="/" className={getLinkClass('/')}>
            <Home size={18} className="mr-1" />
            <span>Home</span>
          </Link>
          
          <Link to="/about" className={getLinkClass('/about')}>
            <span>About</span>
          </Link>

          <Link to="/contact" className={getLinkClass('/contact')}>
            <span>Contact Us</span>
          </Link>
          
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={getLinkClass('/login')}>
                <span>Login</span>
              </Link>
              
              <Link to="/login">
                <Button 
                  className="bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                >
                  <span>Sign Up</span>
                </Button>
              </Link>
            </>
          ) : (
            <Button 
              variant="ghost" 
              className={`flex items-center gap-2 ${textColor}`}
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
