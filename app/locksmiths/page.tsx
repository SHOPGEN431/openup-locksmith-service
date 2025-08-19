'use client';

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
  backgroundCheck: boolean;
  insured: boolean;
  responseRate: number;
  responseTime: number;
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
      backgroundCheck: true,
      insured: true,
      responseRate: 98,
      responseTime: 5,
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
      backgroundCheck: true,
      insured: true,
      responseRate: 100,
      responseTime: 3,
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
      backgroundCheck: true,
      insured: true,
      responseRate: 99,
      responseTime: 4,
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
                  width={120}
                  height={120}
                  className={styles.locksmithImage}
                />
                {locksmith.verified && (
                  <span className={styles.verifiedBadge} title="Verified Professional">
                    ✓ Verified
                  </span>
                )}
              </div>
              <div className={styles.details}>
                <h3>{locksmith.name}</h3>
                <div className={styles.rating}>
                  <span className={styles.stars}>{'★'.repeat(Math.floor(locksmith.rating))}</span>
                  <span className={styles.ratingText}>{locksmith.rating} ({locksmith.reviews} reviews)</span>
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
              <span className={styles.trustBadge} title="Response Time">
                ⚡ {locksmith.responseTime} min Response Time
              </span>
            </div>

            <div className={styles.professionalInfo}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Experience:</span>
                <span className={styles.infoValue}>{locksmith.experience} years</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Response Rate:</span>
                <span className={styles.infoValue}>{locksmith.responseRate}%</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Response Time:</span>
                <span className={styles.infoValue}>{locksmith.responseTime} min</span>
              </div>
            </div>

            <div className={styles.info}>
              <p>📍 {locksmith.distance} miles away</p>
              <p>⏱️ {locksmith.estimatedTime} mins</p>
              <p>💰 ${locksmith.price} base rate</p>
              <p>👨‍🔧 {locksmith.experience} years experience</p>
            </div>

            <div className={styles.certifications}>
              <h4>Certifications & Licenses</h4>
              <div className={styles.certList}>
                {locksmith.certifications.map((cert, index) => (
                  <span key={index} className={styles.certification}>
                    ✓ {cert}
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