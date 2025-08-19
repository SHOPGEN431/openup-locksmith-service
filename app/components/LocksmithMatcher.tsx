'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LocksmithMatcher.module.css';

interface Locksmith {
  id: string;
  name: string;
  rating: number;
  distance: number;
  estimatedTime: number;
  price: number;
}

export default function LocksmithMatcher() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableLocksmiths] = useState<Locksmith[]>([]);

  const serviceTypes = [
    { id: 'emergency', label: 'Emergency Lockout', icon: '🚨' },
    { id: 'rekey', label: 'Rekey Service', icon: '🔑' },
    { id: 'install', label: 'Lock Installation', icon: '🔒' },
    { id: 'repair', label: 'Lock Repair', icon: '🔧' },
    { id: 'duplicate', label: 'Key Duplication', icon: '🗝️' },
    { id: 'security', label: 'Security Upgrade', icon: '🛡️' },
  ];

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
        <h2>Find a Trusted Locksmith</h2>
        <p>OpenUp&apos;s fully licensed & verified locksmiths.</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Service Type</label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            required
          >
            <option value="">Select a service</option>
            {serviceTypes.map((service) => (
              <option key={service.id} value={service.id}>
                {service.icon} {service.label}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <button type="submit" disabled={isLoading} className={styles.submitButton}>
          {isLoading ? 'Finding Locksmiths...' : 'Find OpenUp Locksmith Now'}
        </button>
      </form>

      {availableLocksmiths.length > 0 && (
        <div className={styles.results}>
          <h2 className={styles.resultsHeading}>Available OpenUp Locksmiths</h2>
          {availableLocksmiths.map((locksmith) => (
            <div key={locksmith.id} className={styles.locksmithCard}>
              <div className={styles.locksmithInfo}>
                <h3>{locksmith.name}</h3>
                <p>⭐ {locksmith.rating} • {locksmith.distance} miles away</p>
                <p>⏱️ {locksmith.estimatedTime} min • 💰 ${locksmith.price}</p>
              </div>
              <button className={styles.selectButton}>
                Select Locksmith
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 