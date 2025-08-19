'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LocksmithMatcher.module.css';

export default function LocksmithMatcher() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
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
        <h2>Find Your Locksmith</h2>
        <p>OpenUp&apos;s fully licensed & verified locksmiths</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="service">Service Type</label>
          <select
            id="service"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            <option value="emergency">Emergency Lockout</option>
            <option value="rekey">Rekey Service</option>
            <option value="install">Lock Installation</option>
            <option value="repair">Lock Repair</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isLoading}>
          {isLoading ? 'Finding Locksmiths...' : 'Find OpenUp Locksmith Now'}
        </button>
      </form>
    </div>
  );
} 