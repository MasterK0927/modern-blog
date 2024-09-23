import React from 'react';
import styles from './SortButton.module.css';

const SortButton = ({ sort, onSortChange }) => {
  return (
    <div className={styles.switch}>
      <button
        className={styles.switch__button}
        type="button"
        onClick={() => onSortChange(sort === 'recent' ? 'older' : 'recent')}
        aria-label={`Switch to ${sort === 'recent' ? 'older' : 'recent'} posts`}
      >
        <span
          className={`${styles.switch__option} ${
            sort === 'recent' ? styles.switch__option_active : ''
          }`}
        >
          Recent
        </span>
        <span
          className={`${styles.switch__option} ${
            sort === 'older' ? styles.switch__option_active : ''
          }`}
        >
          Older
        </span>
        <span
          className={`${styles.switch__slider} ${
            sort === 'older' ? styles.switch__slider_right : ''
          }`}
        ></span>
      </button>
    </div>
  );
};

export default SortButton;
