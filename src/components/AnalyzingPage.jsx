import { useEffect, useState } from 'react';
import styles from './AnalyzingPage.module.css';

export default function AnalyzingPage({ onAnalysisComplete, imageData, answers }) {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);

  const phases = [
    { text: "그림 분석 중...", icon: "🎨" },
    { text: "스트레스 요소 파악 중...", icon: "🔍" },
    { text: "대처 자원 분석 중...", icon: "🛡️" },
    { text: "설문 응답 분석 중...", icon: "📊" },
    { text: "종합 분석 중...", icon: "🧠" },
    { text: "맞춤 솔루션 생성 중...", icon: "✨" }
  ];

  useEffect(() => {
    const totalDuration = 8000; // 8 seconds
    const phaseInterval = totalDuration / phases.length;
    const progressInterval = 50;
    const progressIncrement = 100 / (totalDuration / progressInterval);

    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + progressIncrement;
      });
    }, progressInterval);

    const phaseTimer = setInterval(() => {
      setCurrentPhase(prev => {
        if (prev >= phases.length - 1) {
          clearInterval(phaseTimer);
          return prev;
        }
        return prev + 1;
      });
    }, phaseInterval);

    const completeTimer = setTimeout(() => {
      onAnalysisComplete();
    }, totalDuration);

    return () => {
      clearInterval(progressTimer);
      clearInterval(phaseTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnalysisComplete, phases.length]);

  return (
    <div className={styles.container}>
      <div className={`glass-card ${styles.card}`}>
        {/* Brain Animation */}
        <div className={styles.animationArea}>
          <div className={styles.brainContainer}>
            <div className={styles.pulseRing}></div>
            <div className={styles.pulseRing} style={{ animationDelay: '0.5s' }}></div>
            <div className={styles.pulseRing} style={{ animationDelay: '1s' }}></div>
            <div className={styles.brain}>
              <svg viewBox="0 0 64 64" fill="none">
                <path
                  d="M32 8c-8 0-14 6-14 14 0 4 2 8 4 10-2 2-4 6-4 10 0 8 6 14 14 14s14-6 14-14c0-4-2-8-4-10 2-2 4-6 4-10 0-8-6-14-14-14z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M32 8v48M22 22c4 4 16 4 20 0M22 42c4-4 16-4 20 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Phase Text */}
        <div className={styles.phaseSection}>
          <span className={styles.phaseIcon}>{phases[currentPhase].icon}</span>
          <p className={styles.phaseText}>{phases[currentPhase].text}</p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className={styles.progressPercent}>{Math.round(progress)}%</span>
        </div>

        {/* Info */}
        <p className={styles.infoText}>
          AI가 그림과 설문 응답을 종합 분석하고 있습니다.
          <br />
          잠시만 기다려주세요.
        </p>

        {/* Phase Dots */}
        <div className={styles.phaseDots}>
          {phases.map((_, index) => (
            <div
              key={index}
              className={`${styles.dot} ${index <= currentPhase ? styles.active : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
