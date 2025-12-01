import styles from './IntroPage.module.css';

export default function IntroPage({ onNext }) {
  return (
    <div className={styles.container}>
      <div className={`glass-card ${styles.card}`}>
        <div className={styles.cardHeader}>
          <span className={styles.headerIcon}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </span>
          <h2 className={styles.cardTitle}>빗속의 사람 그림 그리기 안내</h2>
        </div>

        {/* Section 1: 주의사항 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.emoji}>&#9995;</span>
            그림을 그리기 전에 잠깐!
          </h3>
          <p className={styles.introText}>
            이 테스트는 여러분의 현재 심리상태와 스트레스 대처능력을 파악하는 전문적인 도구입니다.
          </p>
          <p className={styles.introText}>
            편안한 마음으로 자유롭게 그려주세요. 그림 실력은 전혀 중요하지 않습니다.
          </p>
        </section>

        {/* Section 2: 준비물 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.emoji}>&#128221;</span>
            그리기 준비물
          </h3>
          <ul className={styles.checkList}>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              A4 용지 (또는 그림 그릴 수 있는 종이)
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              연필 또는 펜 (색깔 상관없음)
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              조용하고 편안한 공간
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              휴대폰 카메라 (완성된 그림 촬영용)
            </li>
          </ul>
        </section>

        {/* Section 3: 지시사항 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.emoji}>&#127919;</span>
            그림 그리기 지시사항
          </h3>
          <ul className={styles.checkList}>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              <strong>주제:</strong> "비가 오는 상황에서 한 사람이 있는 그림"을 그려주세요
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              <strong>시간:</strong> 제한시간은 없습니다. 충분히 생각하며 그리세요
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              <strong>표현:</strong> 사람, 비, 그리고 주변 환경을 자유롭게 표현하세요
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              <strong>세부사항:</strong> 우산, 건물, 나무 등 떠오르는 것들을 모두 그려도 좋습니다
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              <strong>완성도:</strong> 간단한 그림이어도 괜찮습니다. 완벽할 필요는 없어요
            </li>
          </ul>
        </section>

        {/* Section 4: 팁 */}
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>
            <span className={styles.emoji}>&#128161;</span>
            중요한 팁
          </h3>
          <ul className={styles.checkList}>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              정답은 없습니다. 여러분이 느끼는 대로 그리세요
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              다른 사람의 의견을 듣지 말고 혼자 그리세요
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              지우개를 너무 많이 사용하지 마세요
            </li>
            <li>
              <span className={styles.checkmark}>&#10003;</span>
              첫 번째 떠오르는 생각대로 그리는 것이 좋습니다
            </li>
          </ul>
        </section>
      </div>

      <button className={styles.nextButton} onClick={onNext}>
        <span className={styles.buttonIcon}>&#9745;</span>
        그림을 완성했습니다. 다음 단계로
        <span className={styles.arrow}>&rarr;</span>
      </button>
    </div>
  );
}
