'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
import styles from './locksmiths.module.css';

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
}

export default function LocksmithsPage() {
  const router = useRouter();
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const locksmiths: Locksmith[] = [
    {
      id: '1',
      name: 'John Smith',
      rating: 4.8,
      distance: 2.5,
      estimatedTime: 15,
      price: 75,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      experience: 15,
      reviews: 234,
      specialties: ['Residential', 'Commercial', 'Automotive'],
      certifications: ['ALOA Certified', 'Safe & Vault Technician', 'Master Locksmith'],
      verified: true,
      backgroundCheck: true,
      insured: true,
      responseRate: 98,
      languages: ['English', 'Spanish'],
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      rating: 4.9,
      distance: 3.1,
      estimatedTime: 20,
      price: 65,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      experience: 12,
      reviews: 189,
      specialties: ['Residential', 'Automotive', 'Smart Locks'],
      certifications: ['ALOA Certified', 'Electronic Security Specialist'],
      verified: true,
      backgroundCheck: true,
      insured: true,
      responseRate: 100,
      languages: ['English', 'French'],
    },
    {
      id: '3',
      name: 'Mike Wilson',
      rating: 4.9,
      distance: 4.2,
      estimatedTime: 25,
      price: 85,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      experience: 20,
      reviews: 412,
      specialties: ['Residential', 'Commercial', 'Automotive', 'Safe'],
      certifications: ['ALOA Certified', 'Safe & Vault Technician', 'Master Locksmith', 'Security Consultant'],
      verified: true,
      backgroundCheck: true,
      insured: true,
      responseRate: 99,
      languages: ['English', 'German'],
    },
  ];

  const handleSelectLocksmith = (id: string) => {
    router.push(`/locksmiths/confirm?id=${id}`);
  };

  const handleImageError = (locksmithId: string) => {
    setImageErrors(prev => ({ ...prev, [locksmithId]: true }));
  };

  return (
    <div className={styles.container}>
      <h1>Available Locksmiths</h1>
      <p className={styles.subtitle}>
        Select from our verified and background-checked locksmiths
      </p>

      <div className={styles.locksmithsGrid}>
        {locksmiths.map((locksmith) => (
          <div
            key={locksmith.id}
            className={styles.locksmithCard}
            onClick={() => handleSelectLocksmith(locksmith.id)}
          >
            <div className={styles.cardHeader}>
              <div className={styles.imageContainer}>
                {!imageErrors[locksmith.id] ? (
                  <Image
                    src={locksmith.image}
                    alt={locksmith.name}
                    width={80}
                    height={80}
                    className={styles.locksmithImage}
                    onError={() => handleImageError(locksmith.id)}
                    unoptimized
                  />
                ) : (
                  <div className={styles.fallbackImage}>
                    <span>👨‍🔧</span>
                  </div>
                )}
                {locksmith.verified && (
                  <div className={styles.verifiedBadge} title="Verified Professional">
                    ✓
                  </div>
                )}
              </div>
              <div className={styles.headerInfo}>
                <h3>{locksmith.name}</h3>
                <div className={styles.rating}>
                  <span>⭐ {locksmith.rating}</span>
                  <span>({locksmith.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className={styles.trustIndicators}>
              {locksmith.backgroundCheck && (
                <span className={styles.trustBadge} title="Background Checked">
                  🔒 Background Checked
                </span>
              )}
              {locksmith.insured && (
                <span className={styles.trustBadge} title="Fully Insured">
                  🛡️ Fully Insured
                </span>
              )}
              <span className={styles.trustBadge} title="Response Rate">
                💬 {locksmith.responseRate}% Response Rate
              </span>
            </div>

            <div className={styles.details}>
              <div className={styles.info}>
                <span>📍 {locksmith.distance} miles away</span>
                <span>⏱️ {locksmith.estimatedTime} min</span>
                <span>💰 ${locksmith.price}</span>
              </div>
              <div className={styles.experience}>
                <span>🛠️ {locksmith.experience} years experience</span>
                <span>📞 {locksmith.responseRate}% response rate</span>
              </div>
            </div>

            <div className={styles.certifications}>
              <h4>Certifications</h4>
              <div className={styles.certList}>
                {locksmith.certifications.map((cert) => (
                  <span key={cert} className={styles.certification}>
                    🏆 {cert}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.specialties}>
              <h4>Specialties</h4>
              <div className={styles.specialtyList}>
                {locksmith.specialties.map((specialty) => (
                  <span key={specialty} className={styles.specialty}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 