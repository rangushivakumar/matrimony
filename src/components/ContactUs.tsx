
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from '@/components/ui/use-toast';
import { Instagram, Phone, Mail } from "lucide-react";

const ContactUs = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Message Sent!",
      description: "We'll get back to you soon.",
    });
    
    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' });
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
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email"
                      name="email"
                      placeholder="Enter your email" 
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
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
          <div className="lg:col-span-2 flex flex-col justify-center">
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
