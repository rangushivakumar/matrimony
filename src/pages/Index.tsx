
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeatureSteps from '@/components/FeatureSteps';
import RecentClients from '@/components/RecentClients';
import ProfileCategories from '@/components/ProfileCategories';
import AppDownload from '@/components/AppDownload';
import Footer from '@/components/Footer';

const Index = () => {
  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeatureSteps />
      <RecentClients />
      <ProfileCategories />
      <AppDownload />
      <Footer />
    </div>
  );
};

export default Index;
