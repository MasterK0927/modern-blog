'use client'
// pages/profile.js
import React, { useState, useEffect } from 'react';

const ProfileComp = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [editedContent, setEditedContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user's posts from the backend
  useEffect(() => {
    // Replace this with your actual API endpoint or data fetching logic
    const fetchPosts = async (slug) => {
      try {
        const response = await fetch(`https://keshavwrites.netlify.app/api/posts/${slug}`);
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleEditPost = (postId) => {
    const postToEdit = posts.find((post) => post.id === postId);
    setSelectedPost(postToEdit);
    setEditedContent(postToEdit.content);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Mock update on the backend (replace with your actual update logic)
      await fetch(`/api/posts/${selectedPost.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });

      // Update the local state after a successful backend update
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id ? { ...post, content: editedContent } : post
        )
      );

      setIsEditing(false);
      setSelectedPost(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedPost(null);
    setEditedContent('');
  };

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');

    if (confirmDelete) {
      try {
        // Mock deletion on the backend (replace with your actual deletion logic)
        await fetch(`https://keshavwrites.netlify.app/api/posts/${postId}`, {
          method: 'DELETE',
        });

        // Update the local state after successful backend deletion
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
      <div>
        <h1>Your ProfileComp</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <p>{post.content}</p>
              <button onClick={() => handleEditPost(post.id)}>Edit</button>
              <button onClick={() => handleDeletePost(post.id)}>Delete</button>
            </li>
          ))}
        </ul>

        {isEditing && (
          <div>
            <h2>Edit Post</h2>
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            ></textarea>
            <button onClick={handleSaveEdit}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        )}
      </div>
  );
};

export default ProfileComp;
