
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';

const LoginModal = () => {
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [signInFormData, setSignInFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  const [signUpFormData, setSignUpFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    acceptTerms: false,
  });
  
  const handleSignInFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignInFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignUpFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success! Set logged in and redirect
      localStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "Login successful!",
        description: "Welcome back to KSR Matrimony.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success! Set logged in and redirect
      localStorage.setItem('isLoggedIn', 'true');
      
      toast({
        title: "Registration successful!",
        description: "Your account has been created.",
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please check your information and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleGoogleLogin = () => {
    // Simulate Google login
    localStorage.setItem('isLoggedIn', 'true');
    toast({
      title: "Google login successful!",
      description: "Welcome to KSR Matrimony.",
    });
    navigate('/');
  };
  
  return (
    <div className="container max-w-md mx-auto px-4 py-8 form-gradient-bg">
      <Card className="bg-white/95 shadow-lg border-0">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center font-playfair">
            {activeTab === 'signin' ? 'Sign In' : 'Create Account'}
          </CardTitle>
        </CardHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="signin" className="mt-2">
            <form onSubmit={handleSignIn}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={signInFormData.email}
                    onChange={handleSignInFormChange}
                    required
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    value={signInFormData.password}
                    onChange={handleSignInFormChange}
                    required
                    className="bg-white"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember-me"
                    name="rememberMe"
                    checked={signInFormData.rememberMe}
                    onCheckedChange={(checked) => {
                      setSignInFormData(prev => ({
                        ...prev,
                        rememberMe: checked === true,
                      }));
                    }}
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Remember me
                  </label>
                  
                  <div className="ml-auto">
                    <a
                      href="#"
                      className="text-sm text-primary hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                      onClick={handleGoogleLogin}
                    >
                      {/* Google Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="text-red-500">
                        <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                      </svg>
                      <span className="text-gray-800">Sign in with Google</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </form>
          </TabsContent>
          
          <TabsContent value="signup" className="mt-2">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    autoComplete="name"
                    value={signUpFormData.name}
                    onChange={handleSignUpFormChange}
                    required
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    autoComplete="email"
                    value={signUpFormData.email}
                    onChange={handleSignUpFormChange}
                    required
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    autoComplete="tel"
                    value={signUpFormData.phone}
                    onChange={handleSignUpFormChange}
                    required
                    className="bg-white"
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    value={signUpFormData.password}
                    onChange={handleSignUpFormChange}
                    required
                    className="bg-white"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="accept-terms"
                    name="acceptTerms"
                    checked={signUpFormData.acceptTerms}
                    onCheckedChange={(checked) => {
                      setSignUpFormData(prev => ({
                        ...prev,
                        acceptTerms: checked === true,
                      }));
                    }}
                    required
                  />
                  <label
                    htmlFor="accept-terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the{" "}
                    <a href="#" className="text-primary hover:underline">
                      terms and conditions
                    </a>
                  </label>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                  disabled={isLoading || !signUpFormData.acceptTerms}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <div>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                      onClick={handleGoogleLogin}
                    >
                      {/* Google Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="text-red-500">
                        <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                      </svg>
                      <span className="text-gray-800">Sign up with Google</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </form>
          </TabsContent>
        </Tabs>
        
        <CardFooter className="flex flex-col items-center p-6 pt-0">
          <p className="text-xs text-center text-muted-foreground mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginModal;
