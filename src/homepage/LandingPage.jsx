import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store/index.js';

// Components
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingChat from './components/FloatingChat.jsx';
import DemoModal from './components/DemoModal.jsx';
import AuthModal from './components/AuthModal.jsx';

// Views
import HomeView from './views/HomeView.jsx';
import FeaturesView from './views/FeaturesView.jsx';
import ServicesView from './views/ServicesView.jsx';
import PricingView from './views/PricingView.jsx';
import ContactView from './views/ContactView.jsx';
import PlaygroundView from './views/PlaygroundView.jsx';

function LandingPageContent() {
  const activePage = useSelector((state) => state.ui.activePage);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activePage]);

  const renderActiveView = () => {
    switch (activePage) {
      case 'home':
        return <HomeView />;
      case 'features':
        return <FeaturesView />;
      case 'services':
        return <ServicesView />;
      case 'pricing':
        return <PricingView />;
      case 'contact':
        return <ContactView />;
      case 'playground':
        return <PlaygroundView />;
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-white text-gray-900 selection:bg-emerald-100 selection:text-emerald-900" id="landing-page-content-container">
      {/* Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderActiveView()}
      </main>

      {/* Footer Block */}
      <Footer />

      {/* Global Interactive Elements */}
      <FloatingChat />
      <DemoModal />
      <AuthModal />
    </div>
  );
}

export default function LandingPage() {
  return (
    <Provider store={store}>
      <LandingPageContent />
    </Provider>
  );
}
