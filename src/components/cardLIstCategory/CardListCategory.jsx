'use client';
import React, { useEffect, useState } from 'react';
import styles from '../cardList/cardList.module.css';
import Card from '../card/Card';
import Pagination from '../pagination/Pagination';
import Error from '@/app/error';
import Loader from '../LoadingComp/LoadingComp';

const CardListCategory = ({ page, cat }) => {
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const POST_PER_PAGE = 2;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?page=${page}&cat=${cat || ''}`, {
          cache: 'no-store',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data.posts);
        setCount(data.count);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, cat]);

  if (loading) return <Loader />;
  if (error) return <Error message={error} />;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts.map((item) => (
          <Card item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardListCategory;
