import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';
import { Instagram, Phone, Mail, Loader2 } from "lucide-react";
import { getAuth } from 'firebase/auth';
import { app } from '@/config/firebaseConfig';

const ContactUs = () => {
  const { toast } = useToast();
  const auth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    age: '',
    gender: '',
    caste: '',
    message: '',
    mail: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+917075929888';
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:ksrservices7@gmail.com';
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/srinivasrreddykasu', '_blank');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.name || !formData.number || !formData.age || !formData.gender || !formData.caste || !formData.mail) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.number)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    // Age validation
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 18 || age > 70) {
      toast({
        title: "Invalid Age",
        description: "Age must be between 18 and 70",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to submit the form",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch('https://apimatrimony.lytortech.com/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: user.uid,
          name: formData.name,
          number: formData.number,
          age: formData.age,
          gender: formData.gender,
          caste: formData.caste,
          message: formData.message,
          mail: formData.mail
        }),
      });
      console.log(response,'--response ---')
      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      toast({
        title: "Form Submitted Successfully!",
        description: "We'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        number: '',
        age: '',
        gender: '',
        caste: '',
        message: '',
        mail: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-8 sm:py-16 px-4 bg-gradient-to-r from-accent/30 to-primary/10" id="contact-us">
      <div className="container mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-12">
          <span className="text-primary">Contact</span> Us For <span className="text-secondary">Enquiry</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-4 sm:p-8 rounded-lg shadow-md">
            <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-secondary">Send us a message</h3>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4 sm:space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="number">Phone Number</Label>
                    <Input
                      id="number"
                      name="number"
                      placeholder="Enter your phone number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                      id="gender"
                      name="gender"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caste">Caste</Label>
                  <select
                    id="caste"
                    name="caste"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.caste}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select caste</option>
                    <option value="Besta Fishermen">Besta Fishermen</option>
                    <option value="Goud">Goud</option>
                    <option value="Kurma">Kurma</option>
                    <option value="Kamma">Kamma</option>
                    <option value="Komatala-Vysya">Komatala-Vysya</option>
                    <option value="Madiga (Christian)">Madiga (Christian)</option>
                    <option value="Madiga (Hindu)">Madiga (Hindu)</option>
                    <option value="Mala (Christian)">Mala (Christian)</option>
                    <option value="Mala (Hindu)">Mala (Hindu)</option>
                    <option value="Mangali">Mangali</option>
                    <option value="Mudiraj-Mutrasi">Mudiraj-Mutrasi</option>
                    <option value="Munnur Kapu">Munnur Kapu</option>
                    <option value="Padmashali">Padmashali</option>
                    <option value="Perika">Perika</option>
                    <option value="Rajaka">Rajaka</option>
                    <option value="Reddy">Reddy</option>
                    <option value="Velama">Velama</option>
                    <option value="Yadav-Golla">Yadav-Golla</option>
                    <option value="Muslim">Muslim</option>

                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="mail"
                    name="mail"
                    placeholder="Enter your email"
                    value={formData.mail}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full"
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white w-full py-4 sm:py-6 text-base sm:text-lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-white p-4 sm:p-8 rounded-lg shadow-md mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-secondary">Get in touch</h3>

              <div className="space-y-4 sm:space-y-6">
                <button
                  onClick={handlePhoneClick}
                  className="flex items-center w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 text-primary mr-4">
                    <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+91 7075929888</p>
                  </div>
                </button>

                <button
                  onClick={handleEmailClick}
                  className="flex items-center w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 text-primary mr-4">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">ksrservices7@gmail.com</p>
                  </div>
                </button>

                <button
                  onClick={handleInstagramClick}
                  className="flex items-center w-full hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary/10 text-primary mr-4">
                    <Instagram className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Instagram</p>
                    <p className="text-gray-600">@srinivasrreddykasu</p>
                  </div>
                </button>
              </div>
            </div>

            <p className="text-center text-gray-600 text-sm sm:text-base">Our team is available to assist you every day from 9 AM to 8 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
