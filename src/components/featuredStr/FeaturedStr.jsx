'use client';
import React from 'react';
import useSWR from 'swr';
import Featured from '../featured/Featured';
import styles from '../featured/featured.module.css';

const fetcher = async (url) => {
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) {
      console.error('Failed to fetch data:', res.statusText);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error('An error occurred while fetching data:', error);
    return null;
  }
};

const FeaturedStr = ({ cat }) => {
  const totalPages = 2;
  const [page, setPage] = React.useState(1);

  const { data, error, isValidating } = useSWR(
    `https://keshavwrites.netlify.app/api/posts?page=${page}&cat=${cat || ''}`,
    fetcher,
  );

  const [randomIndex, setRandomIndex] = React.useState(0);

  React.useEffect(() => {
    if (data && Array.isArray(data.posts) && data.posts.length > 0) {
      setRandomIndex(Math.floor(Math.random() * data.posts.length));
    }
  }, [data]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setPage(Math.floor(Math.random() * totalPages) + 1);
      if (data && Array.isArray(data.posts) && data.posts.length > 0) {
        setRandomIndex(Math.floor(Math.random() * data.posts.length));
      }
    }, 300000);

    return () => clearInterval(interval);
  }, [data, totalPages]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>Hey, Keshav here!</b> Discover Stories and creative ideas
      </h1>
      <div>
        {isValidating && <p>Loading...</p>}
        {data && Array.isArray(data.posts) && data.posts.length > 0 ? (
          <Featured
            item={data.posts[randomIndex]}
            key={data.posts[randomIndex]._id}
          />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default FeaturedStr;
