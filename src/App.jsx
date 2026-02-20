import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Process from './components/Process';
import Services from './components/Services';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/App.css';
import './styles/index.css';

import { ThemeProvider } from './context/ThemeContext';

import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';

import CustomCursor from './components/CustomCursor';
import Chatbot from './components/Chatbot';
import WhatsAppButton from './components/WhatsAppButton';
import WaveDivider from './components/WaveDivider';
import FloatingBubbles from './components/FloatingBubbles';

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <CustomCursor />
        <Chatbot />
        <WhatsAppButton />
        <AnimatePresence>
          {isLoading ? (
            <LoadingScreen key="loading" />
          ) : (
            <>
              <div className="bg-mesh">
                <div className="mesh-circle circle-1"></div>
                <div className="mesh-circle circle-2"></div>
                <div className="mesh-circle circle-3"></div>
              </div>
              <FloatingBubbles />
              <motion.div 
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="app-container"
              >
                <Navbar />
                <main>
                  <Hero />
                  <WaveDivider flip />
                  <About />
                  <WaveDivider />
                  <Process />
                  <WaveDivider flip />
                  <Services />
                  <WaveDivider />
                  <Pricing />
                  <WaveDivider flip />
                  <FAQ />
                  <WaveDivider />
                  <Contact />
                </main>
                <Footer />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
