"use client"
import React from 'react';
import styles from './Error.module.css';

const Error = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Oops! Something went wrong.</h1>
      <p className={styles.message}>Login First for Accessing the Editor</p>
    </div>
  );
};

export default Error;
