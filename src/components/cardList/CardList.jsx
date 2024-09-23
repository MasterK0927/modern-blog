'use client';
import React, { useState, useEffect } from 'react';
import styles from './cardList.module.css';
import Pagination from '../pagination/Pagination';
import Card from '../card/Card';
import SortButton from '../sortButton/SortButton';

const CardList = ({ page, cat }) => {
  const [sort, setSort] = useState('recent');
  const [posts, setPosts] = useState([]);
  const [count, setCount] = useState(0);
  const POST_PER_PAGE = 2;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/posts?page=${page}&cat=${cat || ''}&sort=${sort}`,
          { cache: 'no-store' },
        );
        if (!res.ok) {
          throw new Error('Failed to fetch posts');
        }
        const data = await res.json();
        setPosts(data.posts);
        setCount(data.count);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [page, cat, sort]);

  const handleSortChange = (newSort) => {
    setSort(newSort);
  };

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Posts</h1>
        <div className={styles.sortContainer}>
          <SortButton sort={sort} onSortChange={handleSortChange} />
        </div>
      </div>
      <div className={styles.posts}>
        {posts.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  );
};

export default CardList;
