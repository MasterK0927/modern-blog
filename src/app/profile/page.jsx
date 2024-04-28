import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import styles from '../posts/[slug]/singlePage.module.css'

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
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getData(slug);
        setData(postData);
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [slug]);

  const handleEditPost = () => {
    // Redirect to edit page or modal with post data
    console.log('Editing post:', data);
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
      {data && (
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.user}>
              {data?.user?.image && (
                <div className={styles.userImageContainer}>
                  <Image src={data.user.image} alt="" fill className={styles.avatar} />
                </div>
              )}
              <div className={styles.userTextContainer}>
                <span className={styles.username}>{data?.user.name}</span>
                <span className={styles.date}>01.01.2024</span>
              </div>
            </div>
          </div>
          {data?.img && (
            <div className={styles.imageContainer}>
              <Image src={data.img} alt="" fill className={styles.image} />
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>
        {data && (
          <div className={styles.post}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: data?.desc }}
            />
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
        )}
        <div className={styles.profileSection}>
          <h2>Profile Section</h2>
          {data?.user && (
            <div className={styles.userInfo}>
              <h3>User Information</h3>
              <p>Name: {data.user.name}</p>
              <p>Email: {data.user.email}</p>
              {/* Display additional user information as needed */}
            </div>
          )}
          {data && (
            <div>
              <button onClick={handleEditPost}>Edit Post</button>
              <button onClick={handleDeletePost}>Delete Post</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
