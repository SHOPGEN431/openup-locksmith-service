'use client';

import Navbar from './components/Navbar';
import MultiStepForm from './components/MultiStepForm';
import styles from './page.module.css';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.content}>
          <h1>24/7 Emergency Locksmith Service</h1>
          <p>Get connected with OpenUp&apos;s licensed &amp; verified locksmiths in minutes</p>
          <MultiStepForm />
        </div>
        <section className={styles.features}>
          <div className={styles.featureGrid}>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⚡</div>
              <h3 className={styles.featureTitle}>Fast Response</h3>
              <p className={styles.featureDescription}>
                OpenUp&apos;s average response time of 15-30 minutes in your area
              </p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>🔒</div>
              <h3 className={styles.featureTitle}>Licensed & Insured</h3>
              <p className={styles.featureDescription}>
                All OpenUp locksmiths are verified, licensed, and fully insured
              </p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>💰</span>
              <h3>Fair Pricing</h3>
              <p>Transparent pricing with no hidden fees</p>
            </div>
            <div className={styles.feature}>
              <div className={styles.featureIcon}>⭐</div>
              <h3 className={styles.featureTitle}>Top Rated</h3>
              <p className={styles.featureDescription}>
                OpenUp&apos;s highly rated locksmiths with proven track records
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
