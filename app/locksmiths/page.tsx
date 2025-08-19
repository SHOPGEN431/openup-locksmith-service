'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
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
  backgroundChecked: boolean;
  insured: boolean;
  responseRate: number;
  licenseNumber: string;
  yearsInBusiness: number;
}

export default function LocksmithsPage() {
  const router = useRouter();
  
  const locksmiths: Locksmith[] = [
    {
      id: '1',
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
      insured: true,
      responseRate: 98,
      licenseNumber: 'L-12345',
      yearsInBusiness: 10,
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      rating: 4.9,
      distance: 3.1,
      estimatedTime: 20,
      price: 65,
      image: 'https://randomuser.me/api/portraits/women/44.jpg',
      experience: 12,
      reviews: 189,
      specialties: ['Residential', 'Automotive', 'Smart Locks'],
      certifications: ['ALOA Certified', 'Electronic Security Specialist'],
      verified: true,
      backgroundChecked: true,
      insured: true,
      responseRate: 100,
      licenseNumber: 'L-67890',
      yearsInBusiness: 8,
    },
    {
      id: '3',
      name: 'Mike Wilson',
      rating: 4.9,
      distance: 4.2,
      estimatedTime: 25,
      price: 85,
      image: 'https://randomuser.me/api/portraits/men/67.jpg',
      experience: 20,
      reviews: 412,
      specialties: ['Residential', 'Commercial', 'Automotive', 'Safe'],
      certifications: ['ALOA Certified', 'Safe & Vault Technician', 'Master Locksmith', 'Security Consultant'],
      verified: true,
      backgroundChecked: true,
      insured: true,
      responseRate: 99,
      licenseNumber: 'L-24680',
      yearsInBusiness: 12,
    },
  ];

  const handleSelectLocksmith = (id: string) => {
    router.push(`/locksmiths/confirm?id=${id}`);
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
                <Image
                  src={locksmith.image}
                  alt={locksmith.name}
                  width={80}
                  height={80}
                  className={styles.locksmithImage}
                />
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
              {locksmith.backgroundChecked && (
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
              <span className={styles.trustBadge} title="Years in Business">
                🏢 {locksmith.yearsInBusiness} years in business
              </span>
            </div>

            <div className={styles.details}>
              <h3>{locksmith.name}</h3>
              <div className={styles.rating}>
                <span className={styles.stars}>⭐ {locksmith.rating}</span>
                <span className={styles.reviews}>({locksmith.reviews} reviews)</span>
              </div>
              <div className={styles.info}>
                <span>📍 {locksmith.distance} miles away</span>
                <span>⏱️ {locksmith.estimatedTime} min</span>
                <span>💰 ${locksmith.price}</span>
              </div>
              <div className={styles.experience}>
                <span>🛠️ {locksmith.experience} years experience</span>
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