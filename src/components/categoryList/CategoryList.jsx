import React from 'react';
import styles from './categoryList.module.css';
import Link from 'next/link';
import Image from 'next/image';

const getData = async () => {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

const CategoryList = async () => {
  const data = await getData();
  
  if (!data || data.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Popular Categories</h1>
        <div className={styles.categories}>
          <p>No categories available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Popular Categories</h1>
      <div className={styles.categories}>
        {data.map((item) => (
          <Link
            href={`/blog?cat=${item.slug}`}
            className={`${styles.category} ${styles[item.slug]}`}
            key={item.id}
          >
            {item.img && (
              <Image
                src={item.img}
                alt={item.title}
                width={32}
                height={32}
                className={styles.image}
              />
            )}
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;