import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSteps from '@/components/FeatureSteps';
import ProfileSection from '@/components/ProfileSection';
import RecentClients from '@/components/RecentClients';
import WhyChooseUs from '@/components/WhyChooseUs';
import Footer from '@/components/Footer';
import ContactFormModal from '@/components/ContactFormModal';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const auth = getAuth();
  const { toast } = useToast();

  useEffect(() => {
    const checkCasteData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const response = await fetch(`https://apimatrimony.lytortech.com/api/caste/get/${user.uid}`);
        const data = await response.json();

        // If no caste data or error in response, show the contact form modal
        if (!data || !data.uid || !data.caste) {
          setShowContactModal(true);
        }
      } catch (error) {
        console.error('Error fetching caste data:', error);
        setShowContactModal(true);
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
        <div id="profiles-section">
          <ProfileSection />
        </div>
        <RecentClients />
        <WhyChooseUs />
      </main>
      <Footer />

      {auth.currentUser && (
        <ContactFormModal
          isOpen={showContactModal}
          onClose={() => setShowContactModal(false)}
          uid={auth.currentUser.uid}
        />
      )}
    </div>
  );
};

export default Index;
