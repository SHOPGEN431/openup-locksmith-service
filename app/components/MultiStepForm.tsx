'use client';

import { useRouter } from 'next/navigation';
import styles from './MultiStepForm.module.css';

export default function MultiStepForm() {
  const router = useRouter();

  const steps = [
    { number: 1, label: 'Service' },
    { number: 2, label: 'Location' },
    { number: 3, label: 'Contact' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/locksmiths');
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progressTrack}>
          <div 
            className={styles.progress} 
            style={{ width: '33%' }}
          ></div>
        </div>
        <div className={styles.steps}>
          {steps.map((stepItem) => (
            <div
              key={stepItem.number}
              className={`${styles.stepIndicator} ${
                stepItem.number === 1 ? styles.current : ''
              }`}
            >
              <div className={styles.stepNumber}>
                {stepItem.number}
              </div>
              <div className={styles.stepLabel}>{stepItem.label}</div>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.step}>
          <h2>Choose Your Service</h2>
          <p>What type of locksmith service do you need today?</p>
          <div className={styles.fastService}>
            <h3>⚡ 5-Minute Locksmith</h3>
            <p>Emergency lockout? We&apos;ll be there in minutes!</p>
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Find OpenUp Locksmiths
        </button>
      </form>
    </div>
  );
} 