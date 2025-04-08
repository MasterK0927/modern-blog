import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';
import Link from 'next/link';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

const Featured = ({ item, key }) => {

  let parsedDesc = null;
  if (item?.desc && typeof item.desc === 'string') {
    const truncatedDesc = item.desc.substring(0, 300);
    const sanitizedDesc = DOMPurify.sanitize(truncatedDesc);
    parsedDesc = sanitizedDesc ? parse(sanitizedDesc) : null;
  }

  return (
    <div className={styles.post} key={key}>
      <div className={styles.imgContainer}>
        <Image src={item.img} alt="" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.postTitle}>{item.title}</h1>
        <div className={styles.postDesc}>
          {parsedDesc}
        </div>
        <Link href={`/posts/${item.slug}`} className={styles.link}>
          <button className={styles.button}>Read More</button>
        </Link>
      </div>
    </div>
  );
};

export default Featured;