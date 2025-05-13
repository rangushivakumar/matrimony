import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { app } from '@/config/firebaseConfig';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from 'lucide-react';

interface SignInFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  // community: string;
  acceptTerms: boolean;
}

const LoginModal: React.FC = () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [activeTab, setActiveTab] = useState('signin');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [signInFormData, setSignInFormData] = useState<SignInFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [signUpFormData, setSignUpFormData] = useState<SignUpFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    // community: 'select',
    acceptTerms: false,
  });

  const [errors, setErrors] = useState<{
    signIn?: { email?: string; password?: string };
    signUp?: { [key: string]: string };
  }>({});

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateSignInForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!signInFormData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signInFormData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!signInFormData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors({ signIn: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUpForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!signUpFormData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(signUpFormData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!signUpFormData.password) {
      newErrors.password = 'Password is required';
    } else if (signUpFormData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (signUpFormData.password !== signUpFormData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    // if (!signUpFormData.community || signUpFormData.community === 'select') {
    //   newErrors.community = 'Community is required';
    // }
    if (!signUpFormData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }
    setErrors({ signUp: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSignInFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignInFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors.signIn?.[name as keyof typeof errors.signIn]) {
      setErrors(prev => ({
        ...prev,
        signIn: { ...prev.signIn, [name]: undefined }
      }));
    }
  };

  const handleSignUpFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSignUpFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors.signUp?.[name]) {
      setErrors(prev => ({
        ...prev,
        signUp: { ...prev.signUp, [name]: undefined }
      }));
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignInForm()) return;
    
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      const user = userCredential.user;

      toast({
        title: "Login successful!",
        description: `Welcome back, ${user.email}`,
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUpForm()) return;
  
    setIsLoading(true);
    try {
      // 1. Sign up with Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpFormData.email,
        signUpFormData.password
      );
      const user = userCredential.user;
  
      // 2. Send caste info with uid to your API
      const a =  await fetch("https://apimatrimony.lytortech.com/api/caste/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          // caste: signUpFormData.community,
        }),
      });

      const data = await a.json();
      console.log("Caste API response:", data, user.uid);
  
      toast({
        title: "Registration successful!",
        description: `Account created for ${user.email}`,
      });
  
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const a =  await fetch("https://apimatrimony.lytortech.com/api/caste/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: user.uid,
          // caste: signUpFormData.community,
        }),
      });

      const data = await a.json();
      console.log("Caste API response:", data, user.uid);

      toast({
        title: "Google login successful!",
        description: `Welcome, ${user.displayName || user.email}`,
      });

      navigate('/');
    } catch (error: any) {
      toast({
        title: "Google login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
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
                    className={`bg-white ${errors.signIn?.email ? 'border-red-500' : ''}`}
                  />
                  {errors.signIn?.email && (
                    <p className="text-sm text-red-500">{errors.signIn.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={signInFormData.password}
                      onChange={handleSignInFormChange}
                      required
                      className={`bg-white ${errors.signIn?.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.signIn?.password && (
                    <p className="text-sm text-red-500">{errors.signIn.password}</p>
                  )}
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

                <Button
                  type="button"
                  variant="outline"
                  className="w-full border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2"
                  onClick={handleGoogleLogin}
                  disabled={isGoogleLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" className="text-red-500">
                    <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  {isGoogleLoading ? "Signing in..." : "Sign in with Google"}
                </Button>
              </CardContent>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-2">
            <form onSubmit={handleSignUp}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={signUpFormData.email}
                    onChange={handleSignUpFormChange}
                    required
                    className={`bg-white ${errors.signUp?.email ? 'border-red-500' : ''}`}
                  />
                  {errors.signUp?.email && (
                    <p className="text-sm text-red-500">{errors.signUp.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Password"
                      value={signUpFormData.password}
                      onChange={handleSignUpFormChange}
                      required
                      className={`bg-white ${errors.signUp?.password ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.signUp?.password && (
                    <p className="text-sm text-red-500">{errors.signUp.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={signUpFormData.confirmPassword}
                      onChange={handleSignUpFormChange}
                      required
                      className={`bg-white ${errors.signUp?.confirmPassword ? 'border-red-500' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.signUp?.confirmPassword && (
                    <p className="text-sm text-red-500">{errors.signUp.confirmPassword}</p>
                  )}
                </div>

                {/* <div className="space-y-2">
                  <Select
                    value={signUpFormData.community}
                    onValueChange={(value) => {
                      setSignUpFormData(prev => ({ ...prev, community: value }));
                      if (errors.signUp?.community) {
                        setErrors(prev => ({
                          ...prev,
                          signUp: { ...prev.signUp, community: undefined }
                        }));
                      }
                    }}
                  >
                    <SelectTrigger className={`bg-white ${errors.signUp?.community ? 'border-red-500' : ''}`}>
                      <SelectValue placeholder="Select Community" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="select">Select Community</SelectItem>
                      <SelectItem value="BC-A (Munnur Kapu)">BC-A (Munnur Kapu)</SelectItem>
                      <SelectItem value="BC-A (Goud)">BC-A (Goud)</SelectItem>
                      <SelectItem value="BC-A (Gangaputra / Jalari)">BC-A (Gangaputra / Jalari)</SelectItem>
                      <SelectItem value="BC-A (Kummari)">BC-A (Kummari)</SelectItem>
                      <SelectItem value="BC-A (Vaddera)">BC-A (Vaddera)</SelectItem>
                      <SelectItem value="BC-A (Besta)">BC-A (Besta)</SelectItem>
                      <SelectItem value="BC-A (Are / Arey Kshatriya)">BC-A (Are / Arey Kshatriya)</SelectItem>
                      <SelectItem value="BC-A (Kuruba)">BC-A (Kuruba)</SelectItem>
                      <SelectItem value="BC-A (Rajaka)">BC-A (Rajaka)</SelectItem>
                      <SelectItem value="BC-A (Kamsali)">BC-A (Kamsali)</SelectItem>
                      <SelectItem value="BC-A (Sagara / Uppara)">BC-A (Sagara / Uppara)</SelectItem>
                      <SelectItem value="BC-B (Patel)">BC-B (Patel)</SelectItem>
                      <SelectItem value="BC-B (Yadav / Golla)">BC-B (Yadav / Golla)</SelectItem>
                      <SelectItem value="BC-B (Mudiraj / Mutrasi)">BC-B (Mudiraj / Mutrasi)</SelectItem>
                      <SelectItem value="BC-B (Goud)">BC-B (Goud)</SelectItem>
                      <SelectItem value="BC-B (Gandla)">BC-B (Gandla)</SelectItem>
                      <SelectItem value="BC-B (Kuruma)">BC-B (Kuruma)</SelectItem>
                      <SelectItem value="BC-B (Koppula Velama)">BC-B (Koppula Velama)</SelectItem>
                      <SelectItem value="BC-B (Thogata Veera Kshatriya)">BC-B (Thogata Veera Kshatriya)</SelectItem>
                      <SelectItem value="BC-B (Are Katikam / Kapu)">BC-B (Are Katikam / Kapu)</SelectItem>
                      <SelectItem value="BC-C (Christian)">BC-C (Christian)</SelectItem>
                      <SelectItem value="BC-D (Kapu)">BC-D (Kapu)</SelectItem>
                      <SelectItem value="BC-D (Telaga)">BC-D (Telaga)</SelectItem>
                      <SelectItem value="BC-D (Balija)">BC-D (Balija)</SelectItem>
                      <SelectItem value="BC-D (Ontari)">BC-D (Ontari)</SelectItem>
                      <SelectItem value="BC-D (Munnuru Kapu)">BC-D (Munnuru Kapu)</SelectItem>
                      <SelectItem value="BC-D (Kamma)">BC-D (Kamma)</SelectItem>
                      <SelectItem value="BC-D (Reddy)">BC-D (Reddy)</SelectItem>
                      <SelectItem value="BC-D (Velama)">BC-D (Velama)</SelectItem>
                      <SelectItem value="BC-E (Shaik)">BC-E (Shaik)</SelectItem>
                      <SelectItem value="BC-E (Syed)">BC-E (Syed)</SelectItem>
                      <SelectItem value="BC-E (Moghal)">BC-E (Moghal)</SelectItem>
                      <SelectItem value="BC-E (Pathan)">BC-E (Pathan)</SelectItem>
                      <SelectItem value="BC-E (Qureshi / Butcher)">BC-E (Qureshi / Butcher)</SelectItem>
                      <SelectItem value="BC-E (Labbi)">BC-E (Labbi)</SelectItem>
                      <SelectItem value="BC-E (Mehtar)">BC-E (Mehtar)</SelectItem>
                      <SelectItem value="BC-E (Ansari)">BC-E (Ansari)</SelectItem>
                      <SelectItem value="SC (Madiga)">SC (Madiga)</SelectItem>
                      <SelectItem value="SC (Mala)">SC (Mala)</SelectItem>
                      <SelectItem value="SC (Relli)">SC (Relli)</SelectItem>
                      <SelectItem value="SC (Dommara / Dombar)">SC (Dommara / Dombar)</SelectItem>
                      <SelectItem value="SC (Chakkiliyan / Rajaka)">SC (Chakkiliyan / Rajaka)</SelectItem>
                      <SelectItem value="SC (Pakir / Faqir)">SC (Pakir / Faqir)</SelectItem>
                      <SelectItem value="SC (Bindla)">SC (Bindla)</SelectItem>
                      <SelectItem value="SC (Budaga Jangam)">SC (Budaga Jangam)</SelectItem>
                      <SelectItem value="SC (Vamsha Raj)">SC (Vamsha Raj)</SelectItem>
                      <SelectItem value="SC (Poosala)">SC (Poosala)</SelectItem>
                      <SelectItem value="SC (Valluvan)">SC (Valluvan)</SelectItem>
                      <SelectItem value="SC (Boya)">SC (Boya)</SelectItem>
                      <SelectItem value="SC (Thoti)">SC (Thoti)</SelectItem>
                      <SelectItem value="SC (Adi Andhra)">SC (Adi Andhra)</SelectItem>
                      <SelectItem value="SC (Adi Dravida)">SC (Adi Dravida)</SelectItem>
                      <SelectItem value="SC (Arunthathiyar)">SC (Arunthathiyar)</SelectItem>
                      <SelectItem value="ST (Lambada / Banjara / Sugali)">ST (Lambada / Banjara / Sugali)</SelectItem>
                      <SelectItem value="ST (Gond)">ST (Gond)</SelectItem>
                      <SelectItem value="ST (Koya)">ST (Koya)</SelectItem>
                      <SelectItem value="ST (Chenchu)">ST (Chenchu)</SelectItem>
                      <SelectItem value="ST (Yerukala)">ST (Yerukala)</SelectItem>
                      <SelectItem value="ST (Yanadi)">ST (Yanadi)</SelectItem>
                      <SelectItem value="ST (Konda Reddy)">ST (Konda Reddy)</SelectItem>
                      <SelectItem value="ST (Konda Dora)">ST (Konda Dora)</SelectItem>
                      <SelectItem value="ST (Savara)">ST (Savara)</SelectItem>
                      <SelectItem value="ST (Jatapu)">ST (Jatapu)</SelectItem>
                      <SelectItem value="ST (Kammara)">ST (Kammara)</SelectItem>
                      <SelectItem value="ST (Valmiki / Boya)">ST (Valmiki / Boya)</SelectItem>
                      <SelectItem value="ST (Gadaba)">ST (Gadaba)</SelectItem>
                      <SelectItem value="ST (Hill Reddi)">ST (Hill Reddi)</SelectItem>
                      <SelectItem value="ST (Kolam)">ST (Kolam)</SelectItem>
                      <SelectItem value="ST (Thoti)">ST (Thoti)</SelectItem>
                      <SelectItem value="ST (Porja)">ST (Porja)</SelectItem>
                      <SelectItem value="ST (Bagata)">ST (Bagata)</SelectItem>
                      <SelectItem value="ST (Andh)">ST (Andh)</SelectItem>
                      <SelectItem value="OC (OC)">OC (OC)</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.signUp?.community && (
                    <p className="text-sm text-red-500">{errors.signUp.community}</p>
                  )}
                </div> */}

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    name="acceptTerms"
                    checked={signUpFormData.acceptTerms}
                    onCheckedChange={(checked) => {
                      setSignUpFormData(prev => ({
                        ...prev,
                        acceptTerms: checked === true,
                      }));
                      if (errors.signUp?.acceptTerms) {
                        setErrors(prev => ({
                          ...prev,
                          signUp: { ...prev.signUp, acceptTerms: undefined }
                        }));
                      }
                    }}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I accept the terms and conditions
                  </label>
                </div>
                {errors.signUp?.acceptTerms && (
                  <p className="text-sm text-red-500">{errors.signUp.acceptTerms}</p>
                )}

                <Button
                  type="submit"
                  className="w-full bg-[#00bcd4] hover:bg-[#00acc1] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </CardContent>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export { LoginModal };
export default LoginModal;
