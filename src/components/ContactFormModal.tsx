import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { getAuth } from 'firebase/auth';
import { app } from '@/config/firebaseConfig';

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
}

const ContactFormModal = ({ isOpen, onClose, uid }: ContactFormModalProps) => {
  const { toast } = useToast();
  const auth = getAuth(app);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.number || !formData.age || !formData.gender || !formData.caste || !formData.mail) {
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
      // First save the contact form data
      const contactResponse = await fetch('https://apimatrimony.lytortech.com/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid,
          name: formData.name,
          number: formData.number,
          age: formData.age,
          gender: formData.gender,
          caste: formData.caste,
          message: formData.message,
          mail: formData.mail
        }),
      });

      if (!contactResponse.ok) {
        throw new Error('Failed to submit contact form');
      }

      // Then save the caste data
      const casteResponse = await fetch("https://apimatrimony.lytortech.com/api/caste/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          caste: formData.caste,
        }),
      });

      if (!casteResponse.ok) {
        throw new Error('Failed to save caste');
      }

      toast({
        title: "Success",
        description: "Your information has been saved successfully",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save information",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto border-0 shadow-lg">
        <DialogHeader className="text-center sticky top-0 bg-white pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-900">Complete Your Profile</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Please fill out this form to complete your profile. This information is required to help you find better matches.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
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

            <div className="space-y-1">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
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

            <div className="space-y-1">
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

          <div className="space-y-1">
            <Label htmlFor="caste">Community</Label>
            <select
              id="caste"
              name="caste"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={formData.caste}
              onChange={handleChange}
              required
            >
              <option value="">Select community</option>
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

          <div className="space-y-1">
            <Label htmlFor="mail">Email</Label>
            <Input
              id="mail"
              name="mail"
              type="email"
              placeholder="Enter your email"
              value={formData.mail}
              onChange={handleChange}
              required
              className="w-full"
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="How can we help you?"
              rows={3}
              value={formData.message}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-10 text-base bg-[#00bcd4] hover:bg-[#00acc1] text-white mt-2"
          >
            Complete Profile
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal; 