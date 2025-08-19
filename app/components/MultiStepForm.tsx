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
  { id: 'emergency', label: 'Emergency Lockout', icon: '🚨' },
  { id: 'installation', label: 'Lock Installation', icon: '🔧' },
  { id: 'repair', label: 'Lock Repair', icon: '🔨' },
  { id: 'rekey', label: 'Rekeying', icon: '🔑' },
  { id: 'security', label: 'Security Upgrade', icon: '🛡️' },
];

const urgencyLevels = [
  { id: 'immediate', label: 'Immediate (Within 30 mins)', icon: '⚡' },
  { id: 'today', label: 'Today', icon: '📅' },
  { id: 'scheduled', label: 'Schedule for Later', icon: '⏰' },
];

const steps = [
  { number: 1, label: 'Service Type' },
  { number: 2, label: 'Location' },
  { number: 3, label: 'Contact Info' },
];

const stepSubtitles = {
  1: "Select the type of locksmith service you need",
  2: "Tell us where and when you need the service",
  3: "We'll send you updates about your OpenUp locksmith"
};

export default function MultiStepForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    address: '',
    urgency: '',
    email: '',
    phone: '',
  });
  const [isLocating, setIsLocating] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, serviceType: serviceId });
    setStep(2);
  };

  const handleGetLocation = () => {
    setIsLocating(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setFormData({
              ...formData,
              address: data.display_name || `${latitude}, ${longitude}`,
            });
          } catch (error) {
            console.error('Error getting address:', error);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLocating(false);
        }
      );
    } else {
      setIsLocating(false);
      alert('Geolocation is not supported by your browser');
    }
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(3);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/locksmiths');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.step}>
            <h2>What service do you need?</h2>
            <p className={styles.subtitle}>{stepSubtitles[1]}</p>
            <div className={styles.serviceGrid}>
              {serviceTypes.map((service) => (
                <button
                  key={service.id}
                  className={styles.serviceCard}
                  onClick={() => handleServiceSelect(service.id)}
                >
                  <span className={styles.serviceIcon}>{service.icon}</span>
                  <span className={styles.serviceLabel}>{service.label}</span>
                </button>
              ))}
            </div>
            <div className={styles.fastService}>
              <h3>⚡ 5-Minute Locksmith</h3>
              <p>We&apos;ll connect you with the nearest available locksmith in minutes</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className={styles.step}>
            <h2>Where do you need the service?</h2>
            <p className={styles.subtitle}>{stepSubtitles[2]}</p>
            <form onSubmit={handleAddressSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="address">Address</label>
                <div className={styles.addressInputGroup}>
                  <input
                    type="text"
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your address"
                    required
                  />
                  <button
                    type="button"
                    className={styles.locationButton}
                    onClick={handleGetLocation}
                    disabled={isLocating}
                  >
                    {isLocating ? (
                      <span className={styles.locationSpinner}></span>
                    ) : (
                      <>
                        <span className={styles.locationIcon}>📍</span>
                        <span className={styles.locationText}>Use My Location</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>How urgent is your need?</label>
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
                      <span className={styles.urgencyLabel}>{level.label}</span>
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
                  Back
                </button>
                <button type="submit" className={styles.nextButton}>
                  Continue
                </button>
              </div>
            </form>
            <div className={styles.fastService}>
              <h3>📍 Location Services</h3>
              <p>We&apos;ll find locksmiths near your exact location</p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className={styles.step}>
            <h2>How can we reach you?</h2>
            <p className={styles.subtitle}>{stepSubtitles[3]}</p>
            <form onSubmit={handleContactSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
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
                  Back
                </button>
                <button type="submit" className={styles.nextButton}>
                  Find OpenUp Locksmiths
                </button>
              </div>
            </form>
            <div className={styles.fastService}>
              <h3>📞 Instant Contact</h3>
              <p>We&apos;ll connect you directly with your chosen locksmith</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.progressBar}>
        <div className={styles.progressTrack}>
          <div
            className={styles.progress}
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
        <div className={styles.steps}>
          {steps.map((s) => (
            <div
              key={s.number}
              className={`${styles.stepIndicator} ${
                step >= s.number ? styles.active : ''
              } ${step === s.number ? styles.current : ''}`}
            >
              <div className={styles.stepNumber}>{s.number}</div>
              <div className={styles.stepLabel}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      {renderStep()}
    </div>
  );
} 