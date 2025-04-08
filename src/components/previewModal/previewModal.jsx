import React from 'react';
import styles from './previewModal.module.css';
import parse from 'html-react-parser';
import DOMPurify from 'isomorphic-dompurify';
import style from "../../app/posts/[slug]/singlePage.module.css";
import dynamic from 'next/dynamic';
import Image from 'next/image';

const MDPreview = dynamic(() => import('@uiw/react-md-editor').then(mod => mod.default.Markdown), { ssr: false });

const PreviewModal = ({ title, content, thumbnail, catSlug, onClose }) => {
  const sanitizedContent = content ? DOMPurify.sanitize(content) : '';
  const parsedContent = sanitizedContent ? parse(sanitizedContent) : null;
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Preview</h2>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.previewContainer}>
          {thumbnail && (
            <div className={styles.thumbnailContainer}>
              <Image 
                src={thumbnail} 
                alt="Thumbnail" 
                className={styles.thumbnail} 
                width={600} 
                height={400}
                layout="responsive"
              />
            </div>
          )}
          <div className={styles.previewCategory}>{catSlug}</div>
          <h1 className={styles.previewTitle}>{title}</h1>
          <div className={styles.previewContent} data-color-mode="light">
            <MDPreview source={content} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
