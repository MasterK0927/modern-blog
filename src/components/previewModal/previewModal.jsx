import React from 'react';
import styles from './previewModal.module.css';
import style from "../../app/posts/[slug]/singlePage.module.css";

const PreviewModal = ({ title, content, thumbnail, catSlug, onClose }) => {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>Close</button>
        <div className={styles.previewContainer}>
          {thumbnail && (
            <div className={styles.thumbnailContainer}>
              <img src={thumbnail} alt="Thumbnail" className={styles.thumbnail} />
            </div>
          )}
          <h1 className={styles.previewTitle}>{title}</h1>
          <div className={styles.previewCatSlug}>{catSlug}</div>
          <div className={style.description} dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
