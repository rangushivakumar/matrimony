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
    console.log(uid, 'uid')
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
      console.log(response, 'api response ')
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
    <Dialog open={isOpen} onOpenChange={() => { }}>
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
                <SelectItem value="Besta Fishermen">Besta Fishermen</SelectItem>
                <SelectItem value="Goud">Goud</SelectItem>
                <SelectItem value="Kurma">Kurma</SelectItem>
                <SelectItem value="Kamma">Kamma</SelectItem>
                <SelectItem value="Komatala-Vysya">Komatala-Vysya</SelectItem>
                <SelectItem value="Madiga (Christian)">Madiga (Christian)</SelectItem>
                <SelectItem value="Madiga (Hindu)">Madiga (Hindu)</SelectItem>
                <SelectItem value="Mala (Christian)">Mala (Christian)</SelectItem>
                <SelectItem value="Mala (Hindu)">Mala (Hindu)</SelectItem>
                <SelectItem value="Mangali">Mangali</SelectItem>
                <SelectItem value="Mudiraj-Mutrasi">Mudiraj-Mutrasi</SelectItem>
                <SelectItem value="Munnur Kapu">Munnur Kapu</SelectItem>
                <SelectItem value="Padmashali">Padmashali</SelectItem>
                <SelectItem value="Perika">Perika</SelectItem>
                <SelectItem value="Rajaka">Rajaka</SelectItem>
                <SelectItem value="Reddy">Reddy</SelectItem>
                <SelectItem value="Velama">Velama</SelectItem>
                <SelectItem value="Yadav-Golla">Yadav-Golla</SelectItem>
                <SelectItem value="Muslim">Muslim</SelectItem>
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