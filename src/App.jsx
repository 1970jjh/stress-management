import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Header from './components/Header';
import IntroPage from './components/IntroPage';
import ImageUploadPage from './components/ImageUploadPage';
import QuestionnairePage from './components/QuestionnairePage';
import AnalyzingPage from './components/AnalyzingPage';
import ResultPage from './components/ResultPage';
import RainBackground from './components/RainBackground';
import { analyzeWithGemini } from './services/geminiService';
import './App.css';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [imageData, setImageData] = useState(null);
  const [answers, setAnswers] = useState({});
  const [analysisResult, setAnalysisResult] = useState(null);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(false);

  // Check for API key in localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleImageUpload = (data) => {
    setImageData(data);
  };

  const handleAnswersSubmit = (submittedAnswers) => {
    setAnswers(submittedAnswers);
  };

  const handleAnalysisComplete = async () => {
    // Perform analysis
    const result = await analyzeWithGemini(imageData, answers, apiKey);
    setAnalysisResult(result);
    setCurrentStep(5);
  };

  const handleSaveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setShowApiInput(false);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <IntroPage onNext={handleNext} />;
      case 2:
        return (
          <ImageUploadPage
            onNext={handleNext}
            onImageUpload={handleImageUpload}
          />
        );
      case 3:
        return (
          <QuestionnairePage
            onNext={handleNext}
            onAnswersSubmit={handleAnswersSubmit}
          />
        );
      case 4:
        return (
          <AnalyzingPage
            imageData={imageData}
            answers={answers}
            onAnalysisComplete={handleAnalysisComplete}
          />
        );
      case 5:
        return (
          <ResultPage
            result={analysisResult}
            imageData={imageData}
          />
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

        {/* API Key Settings Button */}
        <button
          className="api-settings-button"
          onClick={() => setShowApiInput(!showApiInput)}
          title="Gemini API 설정"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
        </button>

        {/* API Key Input Modal */}
        {showApiInput && (
          <div className="api-modal-overlay" onClick={() => setShowApiInput(false)}>
            <div className="api-modal" onClick={e => e.stopPropagation()}>
              <h3>Gemini API 설정</h3>
              <p>더 정확한 그림 분석을 위해 Gemini API 키를 입력하세요.</p>
              <input
                type="password"
                placeholder="Gemini API Key"
                defaultValue={apiKey}
                className="api-input"
              />
              <div className="api-modal-buttons">
                <button
                  className="api-cancel-button"
                  onClick={() => setShowApiInput(false)}
                >
                  취소
                </button>
                <button
                  className="api-save-button"
                  onClick={(e) => {
                    const input = e.target.parentElement.previousElementSibling;
                    handleSaveApiKey(input.value);
                  }}
                >
                  저장
                </button>
              </div>
              <p className="api-note">
                * API 키가 없어도 기본 분석은 가능합니다.
                <br />
                * 키는 브라우저에 안전하게 저장됩니다.
              </p>
            </div>
          </div>
        )}

        <Header currentStep={currentStep} totalSteps={5} />
        <main className="main-content">
          {renderStep()}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
