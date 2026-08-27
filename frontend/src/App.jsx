import React, { useState } from 'react';
import Navbar from './components/Navbar';
import CyberBackground from './components/CyberBackground';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import About from './components/About';
import Theme from './components/Theme';
import Highlights from './components/Highlights';
import Registration from './components/Registration';
import SuccessModal from './components/SuccessModal';
import StatusModal from './components/StatusModal';
import Leadership from './components/Leadership';
import Coordinators from './components/Coordinators';
import Venue from './components/Venue';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [successData, setSuccessData] = useState(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isStatusCheckOpen, setIsStatusCheckOpen] = useState(false);

  const handleRegistrationSuccess = (data) => {
    setSuccessData(data);
  };

  return (
    <div className="relative min-h-screen text-slate-100 font-inter selection:bg-cyan-400 selection:text-black">
      {/* Dynamic Visual Engine Canvas Background */}
      <CyberBackground />

      {/* Main Sticky Navbar */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenStatusCheck={() => setIsStatusCheckOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="relative z-10">
        <Hero onRegisterClick={() => {
          const regElem = document.getElementById('register');
          if (regElem) regElem.scrollIntoView({ behavior: 'smooth' });
        }} />

        <Countdown />

        <About />

        <Theme />

        <Highlights />

        <Registration onSuccess={handleRegistrationSuccess} />

        <Leadership />

        <Coordinators />

        <Venue />

        <FAQ />

        <Contact />
      </main>

      {/* Futuristic Footer */}
      <Footer />

      {/* Registration Success Modal */}
      {successData && (
        <SuccessModal
          registrationData={successData}
          onClose={() => setSuccessData(null)}
        />
      )}

      {/* Live Registration Status Checker Modal */}
      <StatusModal
        isOpen={isStatusCheckOpen}
        onClose={() => setIsStatusCheckOpen(false)}
      />

      {/* Admin Management Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}

export default App;
