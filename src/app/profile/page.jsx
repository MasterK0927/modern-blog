'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import styles from '../posts/[slug]/singlePage.module.css';

const getPostData = async (slug) => {
  try {
    const response = await fetch(`https://keshavwrites.netlify.app/api/posts/${slug}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post data');
    }

    return response.json();
  } catch (error) {
    throw new Error(`Error fetching post data: ${error.message}`);
  }
};

const Profile = ({ params }) => {
  const { slug } = params;
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPostData(slug);
        setPostData(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleEditPost = () => {
    setEditedContent(postData.content);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`https://keshavwrites.netlify.app/api/posts/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });

      if (!response.ok) {
        throw new Error('Failed to update post');
      }

      setPostData({ ...postData, content: editedContent });
      setIsEditing(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
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

        setPostData(null);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {postData && (
        <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{postData?.title}</h1>
            <div className={styles.user}>
              {postData?.user?.image && (
                <div className={styles.userImageContainer}>
                  <Image src={postData.user.image} alt="" fill className={styles.avatar} />
                </div>
              )}
              <div className={styles.userTextContainer}>
                <span className={styles.username}>{postData?.user.name}</span>
                <span className={styles.date}>01.01.2024</span>
              </div>
            </div>
          </div>
          {postData?.img && (
            <div className={styles.imageContainer}>
              <Image src={postData.img} alt="" fill className={styles.image} />
            </div>
          )}
        </div>
      )}
      <div className={styles.content}>
        {postData && (
          <div className={styles.post}>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: postData?.desc }}
            />
            <div className={styles.comment}>
              <Comments postSlug={slug} />
            </div>
          </div>
        )}
        <div className={styles.profileSection}>
          <h2>Profile Section</h2>
          {postData && (
            <div>
              {isEditing ? (
                <div>
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                  <button onClick={handleCancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <button onClick={handleEditPost}>Edit Post</button>
                  <button onClick={handleDeletePost}>Delete Post</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
