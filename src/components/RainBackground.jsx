import { useMemo } from 'react';
import styles from './RainBackground.module.css';

export default function RainBackground() {
  const raindrops = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${1 + Math.random() * 2}s`,
      opacity: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  return (
    <div className={styles.rainContainer}>
      {raindrops.map((drop) => (
        <div
          key={drop.id}
          className={styles.raindrop}
          style={{
            left: drop.left,
            animationDelay: drop.delay,
            animationDuration: drop.duration,
            opacity: drop.opacity,
          }}
        />
      ))}
    </div>
  );
}
