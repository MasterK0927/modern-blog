import React, { Suspense, lazy } from 'react';
import styles from './homepage.module.css';
import Loading from '@/components/loading/Loading';

const FeaturedStr = lazy(() => import('@/components/featuredStr/FeaturedStr'));
const CategoryList = lazy(() => import('@/components/categoryList/CategoryList'));
const CardList = lazy(() => import('@/components/cardList/CardList'));

export default function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <div className={styles.container}>
      <Suspense fallback={<Loading />}>
        <FeaturedStr />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <CategoryList />
      </Suspense>
      <div className={styles.content}>
        <Suspense fallback={<Loading />}>
          <CardList page={page} />
        </Suspense>
      </div>
    </div>
  );
}
