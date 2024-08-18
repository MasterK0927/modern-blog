'use client';
import React, { useState, useEffect } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import AuthLinks from '../authLinks/AuthLinks';
import ThemeToggle from '../themeToggle/ThemeToggle';
import { TiContacts, TiHomeOutline } from 'react-icons/ti';
import { MdDeveloperMode } from 'react-icons/md';

const imageLoader = () => {
  return `https://lh3.googleusercontent.com/drive-viewer/AKGpihZTVdX9_yuCy_oQIStF8RZf86L88QDcFjg8QnMahNA-IZn1KXcuZSuyxtUg7fGhqIM9Yv1sJ8r_JlJJPoW_RWsZ9II4WUyhzqE=s1600-rw-v1`;
};

const Navbar = () => {
  const [isScrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setScrolled(scrollTop > 0); // Set to true if scrolled down, false if at the top
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.container} ${isScrolled ? styles.icon : ''}`}>
      <div className={styles.logo}>
        <div className={styles.hiddenLogo}>
          <div className={styles.txt}>Keshav Writes</div>
        </div>
        <div className={styles.logoText}>Keshav Writes</div>
      </div>
      <div className={styles.links}>
        <ThemeToggle />
        <Link href="/" className={styles.link}>
          <div className={styles.linkText}>Home</div>
          <div className={styles.hidden}>
            <TiHomeOutline />
          </div>
        </Link>
        <Link href="/" className={styles.link}>
          <div className={styles.linkText}>Contact</div>
          <div className={styles.hidden}>
            <TiContacts />
          </div>
        </Link>
        <Link href="/" className={styles.link}>
          <div className={styles.linkText}>About</div>
          <div className={styles.hidden}>
            <MdDeveloperMode />
          </div>
        </Link>
        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;
