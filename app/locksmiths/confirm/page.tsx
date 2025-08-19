'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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
  backgroundCheck: boolean;
  insured: boolean;
  responseRate: number;
  languages: string[];
  licenseNumber: string; // Added missing property
}

function ConfirmPageContent() {
  const searchParams = useSearchParams();
  const locksmithId = searchParams.get('id');
  const [status, setStatus] = useState<'confirming' | 'confirmed' | 'arriving'>('confirming');
  const [countdown, setCountdown] = useState(5);

  // Mock locksmith data
  const locksmith: Locksmith = {
    id: locksmithId || '1',
    name: 'John Smith',
    rating: 4.9,
    distance: 2.5,
    estimatedTime: 15,
    price: 75,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    experience: 12,
    reviews: 847,
    specialties: ['Emergency Lockout', 'Rekeying', 'Lock Installation'],
    certifications: ['ALOA Certified', 'Safe & Vault Technician'],
    verified: true,
    backgroundCheck: true,
    insured: true,
    responseRate: 98,
    languages: ['English', 'Spanish'],
    licenseNumber: 'L-12345', // Added missing property
  };

  useEffect(() => {
    // Simulate the confirmation process
    const timer = setTimeout(() => {
      setStatus('confirmed');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === 'confirming') {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    if (status === 'confirmed') {
      const timer = setTimeout(() => {
        setStatus('arriving');
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1>Confirm Your Locksmith</h1>
          <p className={styles.subtitle}>
            {status === 'confirming' && 'We&apos;re verifying your locksmith&apos;s availability...'}
            {status === 'confirmed' && 'Locksmith is available and ready to help!'}
            {status === 'arriving' && 'Your locksmith is on the way!'}
          </p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.statusSection}>
            {status === 'confirming' && (
              <div className={styles.verifying}>
                <div className={styles.countdown}>
                  <div className={styles.countdownNumber}>{countdown}</div>
                  <p>We&apos;re verifying your locksmith&apos;s availability...</p>
                </div>
              </div>
            )}

            {status === 'confirmed' && (
              <div className={styles.confirmed}>
                <div className={styles.checkmark}>✓</div>
                <h2>Locksmith Confirmed!</h2>
                <p>John Smith is on his way to your location</p>
                <div className={styles.eta}>
                  <span>Estimated arrival: 15 minutes</span>
                </div>
              </div>
            )}

            {status === 'arriving' && (
              <div className={styles.arriving}>
                <div className={styles.arrivalIcon}>🚗</div>
                <h2>Your Locksmith is Arriving!</h2>
                <p>John Smith is currently en route to your location</p>
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

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
} 