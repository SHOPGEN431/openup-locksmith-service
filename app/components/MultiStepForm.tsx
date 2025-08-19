'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './MultiStepForm.module.css';

interface FormData {
  serviceType: string;
  address: string;
  urgency: string;
  email: string;
  phone: string;
}

const serviceTypes = [
  { id: 'emergency', label: 'Emergency Lockout', icon: '🚨', description: 'Locked out of home, car, or office' },
  { id: 'rekey', label: 'Rekey Service', icon: '🔑', description: 'Change locks without replacing them' },
  { id: 'install', label: 'Lock Installation', icon: '🔒', description: 'Install new locks or security systems' },
  { id: 'repair', label: 'Lock Repair', icon: '🔧', description: 'Fix broken or malfunctioning locks' },
  { id: 'duplicate', label: 'Key Duplication', icon: '🗝️', description: 'Make copies of your existing keys' },
  { id: 'security', label: 'Security Upgrade', icon: '🛡️', description: 'Enhance your security system' },
];

const urgencyLevels = [
  { id: 'emergency', label: 'Emergency', icon: '🚨', description: 'Need help immediately' },
  { id: 'urgent', label: 'Urgent', icon: '⚡', description: 'Need help within 1 hour' },
  { id: 'normal', label: 'Normal', icon: '📅', description: 'Can wait a few hours' },
  { id: 'scheduled', label: 'Scheduled', icon: '📋', description: 'Schedule for later today' },
];

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    address: '',
    urgency: 'emergency',
    email: '',
    phone: '',
  });

  const steps = [
    { number: 1, label: 'Service' },
    { number: 2, label: 'Location' },
    { number: 3, label: 'Contact' },
  ];

  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, serviceType: serviceId });
    setStep(2);
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.address.trim()) {
      setStep(3);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.phone) {
      // Submit form and redirect to locksmiths page
      router.push('/locksmiths');
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFormData({ ...formData, address: `${latitude}, ${longitude}` });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* Progress Bar */}
      <div className={styles.progressBar}>
        <div className={styles.progressTrack}>
          <div 
            className={styles.progress} 
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
        <div className={styles.steps}>
          {steps.map((stepItem) => (
            <div 
              key={stepItem.number}
              className={`${styles.stepIndicator} ${
                step > stepItem.number ? styles.completed :
                step === stepItem.number ? styles.current : ''
              }`}
            >
              <div className={styles.stepNumber}>
                {step > stepItem.number ? '✓' : stepItem.number}
              </div>
              <span className={styles.stepLabel}>{stepItem.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fast Service Section */}
      <div className={styles.fastService}>
        <div className={styles.fastServiceContent}>
          <span className={styles.fastServiceIcon}>⚡</span>
          <div>
            <h3>5-Minute Locksmith</h3>
            <p>Average response time • Licensed & insured professionals</p>
          </div>
        </div>
      </div>

      {/* Step Content */}
      {step === 1 && (
        <div className={styles.step}>
          <h2>What service do you need?</h2>
          <p className={styles.subtitle}>Choose the type of locksmith service you require</p>
          <div className={styles.serviceGrid}>
            {serviceTypes.map((service) => (
              <button
                key={service.id}
                className={styles.serviceCard}
                onClick={() => handleServiceSelect(service.id)}
              >
                <span className={styles.serviceIcon}>{service.icon}</span>
                <h3>{service.label}</h3>
                <p>{service.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className={styles.step}>
          <h2>Where are you located?</h2>
          <p className={styles.subtitle}>Enter your address so we can find nearby locksmiths</p>
          <form onSubmit={handleAddressSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Address</label>
              <div className={styles.addressInput}>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Enter your full address"
                  required
                />
                <button
                  type="button"
                  className={styles.locationButton}
                  onClick={handleCurrentLocation}
                >
                  📍 Use My Location
                </button>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>How urgent is your request?</label>
              <p className={styles.subtitle}>Select the urgency level to help us prioritize your request</p>
              <div className={styles.urgencyGrid}>
                {urgencyLevels.map((level) => (
                  <button
                    key={level.id}
                    type="button"
                    className={`${styles.urgencyCard} ${
                      formData.urgency === level.id ? styles.selected : ''
                    }`}
                    onClick={() => setFormData({ ...formData, urgency: level.id })}
                  >
                    <span className={styles.urgencyIcon}>{level.icon}</span>
                    <h4>{level.label}</h4>
                    <p>{level.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setStep(1)}
              >
                ← Back
              </button>
              <button type="submit" className={styles.nextButton}>
                Continue →
              </button>
            </div>
          </form>
        </div>
      )}

      {step === 3 && (
        <div className={styles.step}>
          <h2>Contact Information</h2>
          <p className={styles.subtitle}>Provide your details so we can reach you</p>
          <form onSubmit={handleContactSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Enter your email address"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Enter your phone number"
                required
              />
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="button"
                className={styles.backButton}
                onClick={() => setStep(2)}
              >
                ← Back
              </button>
              <button type="submit" className={styles.submitButton}>
                Find Locksmiths →
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 