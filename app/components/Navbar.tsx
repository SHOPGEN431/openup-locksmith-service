'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          🔐 OpenUp
        </Link>

        {/* Desktop Menu */}
        <div className={styles.desktopLinks}>
          <Link href="/services" className={styles.link}>Services</Link>
          <Link href="/pricing" className={styles.link}>Pricing</Link>
          <Link href="/about" className={styles.link}>About</Link>
          <Link href="/contact" className={styles.link}>Contact</Link>
          <button className={styles.loginButton}>Login</button>
        </div>

        {/* Hamburger Menu Button */}
        <button 
          className={styles.menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}></span>
        </button>

        {/* Mobile Menu Overlay */}
        <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.active : ''}`}>
          <div className={styles.mobileLinks}>
            <Link href="/services" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              Services
            </Link>
            <Link href="/pricing" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              Pricing
            </Link>
            <Link href="/about" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link href="/contact" className={styles.link} onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
            <button className={styles.loginButton}>Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
} 