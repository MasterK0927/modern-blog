import React from 'react';
import styles from './Loading.module.css';

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.circle}>
          <div className={styles.circleText}>
            Keshav
            <br />
            Writes
          </div>
        </div>
        <div className={styles.dots}>
          {[...Array(8)].map((_, index) => (
            <div
              key={index}
              className={styles.dot}
              style={{ '--i': index }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loader;
