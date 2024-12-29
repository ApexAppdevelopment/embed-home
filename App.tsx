import React, { useState, useEffect } from 'react';

const PanyeroApp: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showInstallButton, setShowInstallButton] = useState(false);
  let deferredPrompt: any;

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      deferredPrompt = e;
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
      setShowInstallButton(false);
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        console.log('Panyero installation accepted');
      } else {
        console.log('Panyero installation dismissed');
      }
      deferredPrompt = null;
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100">
      <div className="absolute top-0 left-0 w-full h-full">
        <iframe
          src="https://aitekph.com/card/main.html"
          id="main-iframe"
          className={`w-full h-full border-none transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={handleIframeLoad}
          title="Panyero App"
        ></iframe>
      </div>
      {loading && (
        <div className="absolute-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-50 mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      )}
       {showInstallButton && (
        <button
          id="install-button"
          className="fixed bottom-5 right-5 bg-blue-500 hover:bg-blue-600 text-white border-none rounded-md px-4 py-2 font-medium shadow-md cursor-pointer"
          onClick={handleInstallClick}
        >
          Install Panyero
        </button>
      )}
    </div>
  );
};

export default PanyeroApp;