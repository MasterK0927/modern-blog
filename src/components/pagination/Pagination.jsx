'use client';

import React, { useState } from 'react';
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation';
import Loading from '../LoadingComp/LoadingComp';

const Pagination = ({ page, hasPrev, hasNext }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNavigation = (direction) => {
    setLoading(true);
    try {
      router.push(`?page=${direction === 'prev' ? page - 1 : page + 1}`);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
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
