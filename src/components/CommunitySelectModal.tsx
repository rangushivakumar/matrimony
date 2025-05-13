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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CommunitySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
}

const CommunitySelectModal = ({ isOpen, onClose, uid }: CommunitySelectModalProps) => {
  const [selectedCommunity, setSelectedCommunity] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = async () => {
    if (!selectedCommunity) {
      toast({
        title: "Error",
        description: "Please select a community",
        variant: "destructive",
      });
      return;
    }
    console.log(uid,'uid')
    setIsLoading(true);
    try {
      const response = await fetch("https://apimatrimony.lytortech.com/api/caste/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid,
          caste: selectedCommunity,
        }),
      });
      console.log(response,'api response ')
      if (!response.ok) {
        throw new Error("Failed to save community");
      }

      toast({
        title: "Success",
        description: "Community saved successfully",
      });
      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to save community",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[425px] border-0 shadow-lg">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900">Select Your Community</DialogTitle>
          <DialogDescription className="text-gray-600 mt-2">
            Please select your community to continue. This information is required to help you find better matches.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-6">
          <div className="relative">
            <Select
              value={selectedCommunity}
              onValueChange={setSelectedCommunity}
            >
              <SelectTrigger className="w-full h-12 text-lg border-2 border-gray-200 focus:border-[#00bcd4] focus:ring-[#00bcd4]">
                <SelectValue placeholder="Select your community" />
              </SelectTrigger>
              <SelectContent className="max-h-[300px]">
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
          </div>
          <Button
            onClick={handleSave}
            disabled={isLoading || !selectedCommunity}
            className="w-full h-12 text-lg bg-[#00bcd4] hover:bg-[#00acc1] text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Saving..." : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommunitySelectModal; 