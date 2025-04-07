'use client';
import Image from 'next/image';
import styles from './card.module.css';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LoadingSpinner from '../LoadingComp/LoadingComp';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

const Card = ({ item }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleReadMore = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(`/posts/${item.slug}`);
    try {
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  let truncatedDesc = '';
  if (item?.desc) {
    truncatedDesc = item.desc.substring(0, 109);
    const sanitizedDesc = DOMPurify.sanitize(truncatedDesc);
    truncatedDesc = sanitizedDesc ? parse(sanitizedDesc) : null;
  }

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <div className={styles.container}>
        {item.img && (
          <div className={styles.imageContainer}>
            <Image
              src={item.img}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
          </div>
        )}
        <div className={styles.textContainer}>
          <div className={styles.detail}>
            <span className={styles.date}>
              {item.createdAt.substring(0, 10)} -{' '}
            </span>
            <span className={styles.category}>{item.catSlug}</span>
          </div>
          <Link href={`/posts/${item.slug}`}>
            <h1 className={styles.title}>{item.title}</h1>
          </Link>
          <div className={styles.desc}>
            {truncatedDesc}
          </div>
          <button
            onClick={handleReadMore}
            className={styles.link}
            disabled={isLoading}
          >
            Read More
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;