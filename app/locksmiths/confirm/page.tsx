'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import styles from './confirm.module.css';

interface Locksmith {
  id: string;
  name: string;
  rating: number;
  distance: number;
  estimatedTime: number;
  price: number;
  image: string;
  experience: number;
  reviews: number;
  specialties: string[];
  certifications: string[];
  verified: boolean;
  backgroundChecked: boolean;
  insurance: boolean;
  responseRate: number;
  responseTime: string;
  companyName: string;
  licenseNumber: string;
}

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [locksmith, setLocksmith] = useState<Locksmith | null>(null);
  const [status, setStatus] = useState<'confirming' | 'confirmed' | 'arriving'>('confirming');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const locksmithId = searchParams.get('id');
    if (!locksmithId) {
      router.push('/locksmiths');
      return;
    }

    // In a real app, this would be an API call
    const mockLocksmith: Locksmith = {
      id: locksmithId,
      name: 'John Smith',
      rating: 4.8,
      distance: 2.5,
      estimatedTime: 15,
      price: 75,
      image: 'https://randomuser.me/api/portraits/men/32.jpg',
      experience: 15,
      reviews: 234,
      specialties: ['Residential', 'Commercial', 'Automotive'],
      certifications: ['ALOA Certified', 'Safe & Vault Technician', 'Master Locksmith'],
      verified: true,
      backgroundChecked: true,
      insurance: true,
      responseRate: 98,
      responseTime: '< 5 min',
      companyName: 'Smith Security Solutions',
      licenseNumber: 'L-12345',
    };

    setLocksmith(mockLocksmith);
  }, [searchParams, router]);

  useEffect(() => {
    if (status === 'confirming' && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (status === 'confirming' && countdown === 0) {
      setStatus('confirmed');
    }
  }, [countdown, status]);

  const handleConfirm = () => {
    setStatus('arriving');
  };

  if (!locksmith) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Confirm Your Locksmith</h1>
        <p className={styles.subtitle}>
          {status === 'confirming' && 'Verifying locksmith availability...'}
          {status === 'confirmed' && 'Locksmith is available and ready to help!'}
          {status === 'arriving' && 'Your locksmith is on the way!'}
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.locksmithCard}>
          <div className={styles.cardHeader}>
            <div className={styles.imageContainer}>
              <Image
                src={locksmith.image}
                alt={locksmith.name}
                width={120}
                height={120}
                className={styles.image}
              />
              {locksmith.verified && (
                <div className={styles.verifiedBadge} title="Verified Professional">
                  ✓
                </div>
              )}
            </div>
            <div className={styles.headerInfo}>
              <h2>{locksmith.name}</h2>
              <p className={styles.companyName}>{locksmith.companyName}</p>
              <div className={styles.rating}>
                <span>⭐ {locksmith.rating}</span>
                <span>({locksmith.reviews} reviews)</span>
              </div>
            </div>
          </div>

          <div className={styles.statusSection}>
            {status === 'confirming' && (
              <div className={styles.countdown}>
                <div className={styles.countdownNumber}>{countdown}</div>
                <p>Verifying availability...</p>
              </div>
            )}
            {status === 'confirmed' && (
              <div className={styles.confirmation}>
                <div className={styles.checkmark}>✓</div>
                <p>Locksmith is available!</p>
                <button onClick={handleConfirm} className={styles.confirmButton}>
                  Confirm Booking
                </button>
              </div>
            )}
            {status === 'arriving' && (
              <div className={styles.arriving}>
                <div className={styles.arrivingAnimation}>
                  <div className={styles.car}>🚗</div>
                </div>
                <p>Your locksmith is on the way!</p>
                <div className={styles.eta}>
                  <span>Estimated arrival time:</span>
                  <span className={styles.time}>{locksmith.estimatedTime} minutes</span>
                </div>
                <div className={styles.contactInfo}>
                  <p>You&apos;ll receive a text message with the locksmith&apos;s contact information</p>
                  <p>Please keep your phone nearby</p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.details}>
            <h3>Service Details</h3>
            <div className={styles.detailGrid}>
              <div className={styles.detailItem}>
                <span className={styles.label}>Distance</span>
                <span className={styles.value}>{locksmith.distance} miles</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Base Rate</span>
                <span className={styles.value}>${locksmith.price}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>Experience</span>
                <span className={styles.value}>{locksmith.experience} years</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.label}>License</span>
                <span className={styles.value}>{locksmith.licenseNumber}</span>
              </div>
            </div>
          </div>

          <div className={styles.trustSection}>
            <h3>Why You Can Trust This Locksmith</h3>
            <div className={styles.trustGrid}>
              <div className={styles.trustItem}>
                <span className={styles.icon}>🔒</span>
                <span>Background Checked</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.icon}>🛡️</span>
                <span>Fully Insured</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.icon}>⭐</span>
                <span>{locksmith.rating} Rating</span>
              </div>
              <div className={styles.trustItem}>
                <span className={styles.icon}>💬</span>
                <span>{locksmith.responseRate}% Response Rate</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 