'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import styles from './confirm.module.css';

function ConfirmPageContent() {
  const searchParams = useSearchParams();
  const locksmithId = searchParams.get('id');
  const [status, setStatus] = useState<'verifying' | 'confirmed' | 'arriving'>('verifying');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setStatus('confirmed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Confirming Your Service</h1>
          <p>We&apos;re connecting you with your OpenUp locksmith</p>
        </div>

        <div className={styles.statusSection}>
          {status === 'verifying' && (
            <div className={styles.verifying}>
              <div className={styles.countdown}>{countdown}</div>
              <p>Verifying locksmith availability...</p>
            </div>
          )}
          
          {status === 'confirmed' && (
            <div className={styles.confirmationMessage}>
              <h2>Service Confirmed!</h2>
              <p>Your OpenUp locksmith is on the way. We&apos;ll keep you updated on their progress.</p>
            </div>
          )}

          {status === 'arriving' && (
            <div className={styles.arriving}>
              <div className={styles.checkmark}>✓</div>
              <h2>Locksmith is Arriving!</h2>
              <p>Your OpenUp locksmith is on their way to your location.</p>
            </div>
          )}
        </div>

        <div className={styles.serviceDetails}>
          <h3>Service Details</h3>
          <div className={styles.details}>
            <div className={styles.detail}>
              <span className={styles.label}>Service ID:</span>
              <span className={styles.value}>#{locksmithId || '12345'}</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.label}>Service Type:</span>
              <span className={styles.value}>Emergency Lockout</span>
            </div>
            <div className={styles.detail}>
              <span className={styles.label}>Estimated Arrival:</span>
              <span className={styles.value}>15-20 minutes</span>
            </div>
          </div>
        </div>

        <div className={styles.trustIndicators}>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>🔒</span>
            <span>Licensed & Insured</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>✓</span>
            <span>Background Checked</span>
          </div>
          <div className={styles.trustItem}>
            <span className={styles.trustIcon}>⭐</span>
            <span>4.9+ Rating</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
} 