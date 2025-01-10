'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Loading from '../LoadingComp/LoadingComp';
import styles from './pagination.module.css';

const Pagination = ({ page, hasPrev, hasNext }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [router]);

  const handleNavigation = (direction) => {
    router.push(`?page=${direction === 'prev' ? page - 1 : page + 1}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleNavigation('prev')}
      >
        Previous
      </button>
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => handleNavigation('next')}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;