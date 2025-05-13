import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';
import { Instagram, Phone, Mail } from "lucide-react";
import { getAuth } from 'firebase/auth';
import { app } from '@/config/firebaseConfig';

const ContactUs = () => {
  const { toast } = useToast();
  const auth = getAuth(app);
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    age: '',
    gender: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.number || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.number)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
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
          message: formData.message
        }),
      });

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
        message: ''
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit form. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-accent/30 to-primary/10" id="contact-us">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-primary">Contact</span> Us For <span className="text-secondary">Enquiry</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-3 bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-6 text-secondary">Send us a message</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name"
                      name="name"
                      placeholder="Enter your name" 
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <Label htmlFor="message">Message (Optional)</Label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="How can we help you?" 
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-primary hover:bg-primary/90 text-white w-full py-6 text-lg"
                >
                  Send Message
                </Button>
              </div>
            </form>
          </div>
          
          {/* Contact Information */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-lg shadow-md mb-6">
              <h3 className="text-2xl font-semibold mb-6 text-secondary">Get in touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-gray-600">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@ksrmatrimony.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary mr-4">
                    <Instagram className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-gray-600">@ksrmatrimony</p>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-gray-600">Our team is available to assist you every day from 9 AM to 8 PM</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
