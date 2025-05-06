
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Mail, Filter, Heart, LogIn, LogOut, Settings, Home } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Check if user is scrolled
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    
    // Check for login status on mount
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);
    
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleLogin = () => {
    // For testing purposes, set isLoggedIn to true
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const navbarBgClass = isHomePage 
    ? scrolled 
      ? 'backdrop-blur-md bg-white/70 shadow-sm' 
      : 'bg-transparent'
    : 'backdrop-blur-md bg-white/70 shadow-sm';

  const textColor = isHomePage && !scrolled ? 'text-white' : 'text-gray-700';
  
  // Updated logo text classes with specific color values
  const logoTextClass = isHomePage && !scrolled 
    ? 'text-[#E91E63]' 
    : 'text-[#E91E63]';
    
  const logoSubTextClass = isHomePage && !scrolled 
    ? 'text-purple' 
    : 'text-purple';

  // Add margin to all pages except home page
  const navbarMarginClass = isHomePage ? '' : 'mb-16';

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
          <Link to="/" className={`hidden md:flex items-center hover:text-primary transition-colors duration-200 ${textColor}`}>
            <Home size={18} className="mr-1" />
            <span>Home</span>
          </Link>
          
          <Link to="/about" className={`hidden md:flex items-center hover:text-primary transition-colors duration-200 ${textColor}`}>
            <span>About</span>
          </Link>
          
          {!isLoggedIn ? (
            <>
              <Link to="/login" className={`hidden md:block hover:text-primary transition-colors duration-200 ${textColor}`}>
                <span>Login</span>
              </Link>
              
              <Link to="/contact" className={`hidden md:flex items-center hover:text-primary transition-colors duration-200 ${textColor}`}>
                <span>Help</span>
              </Link>
              
              <Link to="/login">
                <Button 
                  className="bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                  onClick={handleLogin} // For testing purposes
                >
                  <span>Sign Up Free</span>
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/contact" className={`hidden md:flex items-center hover:text-primary transition-colors duration-200 ${textColor}`}>
                <span>Help</span>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:opacity-90 transition-opacity">
                    <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3" />
                    <AvatarFallback className="bg-primary text-primary-foreground">US</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">User Name</p>
                      <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} />
                      <span>My Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                      <Settings size={16} />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="text-red-500 focus:bg-red-50 cursor-pointer"
                  >
                    <LogOut size={16} className="mr-2" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
