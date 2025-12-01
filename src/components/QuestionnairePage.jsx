import { useState } from 'react';
import { stressQuestions } from '../data/questions';
import styles from './QuestionnairePage.module.css';

export default function QuestionnairePage({ onNext, onAnswersSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);

  const question = stressQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / stressQuestions.length) * 100;
  const isLastQuestion = currentQuestion === stressQuestions.length - 1;
  const allAnswered = Object.keys(answers).length === stressQuestions.length;

  const handleOptionSelect = (value) => {
    setSelectedOption(value);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = { ...answers, [question.id]: selectedOption };
      setAnswers(newAnswers);

      if (isLastQuestion) {
        onAnswersSubmit(newAnswers);
        onNext();
      } else {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(answers[stressQuestions[currentQuestion + 1]?.id] ?? null);
      }
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[stressQuestions[currentQuestion - 1]?.id] ?? null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`glass-card ${styles.card}`}>
        {/* Progress */}
        <div className={styles.progressSection}>
          <div className={styles.progressInfo}>
            <span className={styles.questionCount}>
              질문 {currentQuestion + 1} / {stressQuestions.length}
            </span>
            <span className={styles.category}>{question.category}</span>
          </div>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className={styles.questionSection}>
          <h3 className={styles.question}>{question.question}</h3>
        </div>

        {/* Options */}
        <div className={styles.optionsSection}>
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${selectedOption === option.value ? styles.selected : ''}`}
              onClick={() => handleOptionSelect(option.value)}
            >
              <span className={styles.optionIndicator}>
                {selectedOption === option.value ? (
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                ) : (
                  <span className={styles.optionCircle}></span>
                )}
              </span>
              <span className={styles.optionLabel}>{option.label}</span>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className={styles.navigation}>
          <button
            className={`${styles.navButton} ${styles.prevButton} ${currentQuestion === 0 ? styles.hidden : ''}`}
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            <span className={styles.navArrow}>&larr;</span>
            이전
          </button>

          <button
            className={`${styles.navButton} ${styles.nextButton} ${selectedOption === null ? styles.disabled : ''}`}
            onClick={handleNext}
            disabled={selectedOption === null}
          >
            {isLastQuestion ? '분석 시작' : '다음'}
            <span className={styles.navArrow}>&rarr;</span>
          </button>
        </div>
      </div>

      {/* Question Dots */}
      <div className={styles.questionDots}>
        {stressQuestions.map((q, index) => (
          <div
            key={q.id}
            className={`${styles.dot} ${index === currentQuestion ? styles.current : ''} ${answers[q.id] !== undefined ? styles.answered : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
