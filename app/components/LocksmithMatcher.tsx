'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LocksmithMatcher.module.css';

export default function LocksmithMatcher() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push('/locksmiths');
    }, 1000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Find Your OpenUp Locksmith</h2>
        <p>OpenUp&apos;s fully licensed & verified locksmiths.</p>
      </div>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading ? 'Finding Locksmiths...' : 'Find OpenUp Locksmith Now'}
        </button>
      </form>
    </div>
  );
} 