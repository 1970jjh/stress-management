import styles from './Header.module.css';

export default function Header({ currentStep = 1, totalSteps = 5 }) {
  return (
    <header className={styles.header}>
      <div className={styles.titleArea}>
        <span className={styles.cloudIcon}>
          <svg viewBox="0 0 64 64" fill="currentColor">
            <path d="M48 28c0-8.8-7.2-16-16-16-7.3 0-13.4 4.9-15.4 11.5C9.3 24.3 4 30.1 4 37c0 7.7 6.3 14 14 14h28c6.6 0 12-5.4 12-12 0-5.9-4.3-10.8-10-11.8V28z"/>
            <path d="M20 52l4 8M28 52l4 8M36 52l4 8M44 52l4 8M16 52l4 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.7"/>
          </svg>
        </span>
        <h1 className={styles.title}>스트레스 관리 - 빗속의 사람</h1>
      </div>
      <p className={styles.subtitle}>그림을 통한 심리상태 분석 및 맞춤형 스트레스 관리</p>
      <p className={styles.description}>PITR(Person in the Rain) 기반 전문 심리 분석 도구</p>

      <div className={styles.stepIndicator}>
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={`${styles.step} ${i + 1 === currentStep ? styles.active : ''} ${i + 1 < currentStep ? styles.completed : ''}`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </header>
  );
}
