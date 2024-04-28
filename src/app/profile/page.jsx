import React from 'react';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import styles from '../posts/[slug]/singlePage.module.css';

const getData = async (slug) => {
  const res = await fetch(`https://keshavwrites.netlify.app/api/posts/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed');
  }

  return res.json();
};

const Profile = ({ params }) => {
  const { slug } = params;

  const handleEditPost = () => {
    // Redirect to edit page or modal with post data
    getData(slug)
      .then((data) => console.log('Editing post:', data))
      .catch((error) => console.error('Error fetching post data:', error));
  };

  const handleDeletePost = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    
    if (confirmDelete) {
      try {
        const response = await fetch(`https://keshavwrites.netlify.app/api/posts/${slug}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete post');
        }

        // Update UI: Remove deleted post from state or navigate to a different page
        console.log('Post deleted successfully');
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>{slug}</h1>
          <div className={styles.user}>
            <div className={styles.userTextContainer}>
              <span className={styles.username}>User Name</span>
              <span className={styles.date}>01.01.2024</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.comment}>
            <Comments postSlug={slug} />
          </div>
        </div>
        <div className={styles.profileSection}>
          <h2>Profile Section</h2>
          <div>
            <button onClick={handleEditPost}>Edit Post</button>
            <button onClick={handleDeletePost}>Delete Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
