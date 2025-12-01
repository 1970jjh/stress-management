import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import IntroPage from './components/IntroPage';
import RainBackground from './components/RainBackground';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <IntroPage onNext={handleNext} />;
      case 2:
      case 3:
      case 4:
      case 5:
        return (
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '1.5rem'
          }}>
            Step {currentStep} - Coming Soon
          </div>
        );
      default:
        return <IntroPage onNext={handleNext} />;
    }
  };

  return (
    <ThemeProvider>
      <div className="app">
        <RainBackground />
        <ThemeToggle />
        <Header currentStep={currentStep} totalSteps={5} />
        <main className="main-content">
          {renderStep()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
