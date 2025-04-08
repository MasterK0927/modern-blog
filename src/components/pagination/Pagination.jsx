'use client';

import React, { useState, useEffect } from 'react';
import styles from './pagination.module.css';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Loading from '../LoadingComp/LoadingComp';

const Pagination = ({ page, hasPrev, hasNext }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (loading) {
      setLoading(false);
    }
  }, [searchParams, loading]);

  const handleNavigation = (direction) => {
    setLoading(true);
    const targetPage = direction === 'prev' ? page - 1 : page + 1;
    router.push(`?page=${targetPage}`);
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
