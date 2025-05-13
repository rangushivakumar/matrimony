import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSteps from '@/components/FeatureSteps';
import ProfileSection from '@/components/ProfileSection';
import RecentClients from '@/components/RecentClients';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';
import CommunitySelectModal from '@/components/CommunitySelectModal';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [showCommunityModal, setShowCommunityModal] = useState(false);
  const auth = getAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkCasteData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const response = await fetch(`https://apimatrimony.lytortech.com/api/caste/get/${user.uid}`);
        const data = await response.json();

        // If no caste data or error in response, show the community selection modal
        if (!data || !data.uid || !data.caste) {
          setShowCommunityModal(true);
        }
      } catch (error) {
        console.error('Error fetching caste data:', error);
        setShowCommunityModal(true);
      }
    };

    checkCasteData();
  }, [auth]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <FeatureSteps />
        <ProfileSection />
        <RecentClients />
        <WhyChooseUs />
      </main>
      <Footer />

      {auth.currentUser && (
        <CommunitySelectModal
          isOpen={showCommunityModal}
          onClose={() => setShowCommunityModal(false)}
          uid={auth.currentUser.uid}
        />
      )}
    </div>
  );
};

export default Index;
