
import { Button } from "@/components/ui/button";

const AppDownload = () => {
  return (
    <section className="py-10 px-4 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Download the Matrimony App</h2>
        
        <div className="flex justify-center space-x-4">
          <a href="#" className="inline-block">
            <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" className="h-12" />
          </a>
          <a href="#" className="inline-block">
            <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png" alt="Download on the App Store" className="h-12" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownload;
