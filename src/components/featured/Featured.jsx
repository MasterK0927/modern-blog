import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';
import Link from 'next/link';

const Featured = ({ item, key }) => {
  console.log('Featured: ', item);
  const truncatedDesc =
    item?.desc && typeof item.desc === 'string'
      ? item.desc.substring(0, 300)
      : '';

  return (
    <div className={styles.post} key={key}>
      <div className={styles.imgContainer}>
        <Image src={item.img} alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.postTitle}>{item.title}</h1>
        <div
          className={styles.postDesc}
          dangerouslySetInnerHTML={{ __html: truncatedDesc }}
        />
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          <button className={styles.button}>Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default Featured;
