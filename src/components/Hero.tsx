import { useEffect, useState } from 'react';

const Hero = () => {
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const titleTimer = setTimeout(() => {
      setShowTitle(true);
    }, 500);

    return () => {
      clearTimeout(titleTimer);
    };
  }, []);

  return (
    <div className="relative min-h-[94vh] bg-[url('https://images.unsplash.com/photo-1505428215601-90f0007b9e83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center flex flex-col items-center justify-center overflow-hidden px-4 py-16 before:content-[''] before:absolute before:inset-0 before:bg-black/60">
      <div className="container mx-auto z-10 text-white">
        <div
          className={`text-center transition-all duration-1000 ease-in-out transform ${showTitle ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-24'}`}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#ff5252] via-[#ff7676] to-[#ff9e9e] bg-clip-text text-transparent">
              KSR Matrimony
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-8 text-white/90">
            Find Your Perfect Match
          </p>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-white/80 leading-relaxed">
            Welcome to KSR Matrimony, where tradition meets technology. We're dedicated to helping you find your life partner with our trusted matchmaking service. Join thousands of happy couples who found their perfect match through our platform.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
