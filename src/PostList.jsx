// src/PostList.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null); // Track selected post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Handle card click to display individual post
  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post to display
  };

  // Handle back button click
  const handleBackClick = () => {
    setSelectedPost(null); // Go back to the list of posts
  };

  return (
    <div className="post-list">
      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error}</p>}

      {/* Conditional rendering based on whether a post is selected */}
      {selectedPost ? (
        <div className="post-details">
          <button onClick={handleBackClick}>Back to Post List</button>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
        </div>
      ) : (
        <>
          <h1>Post List</h1>
          <div className="card-container">
            {posts.map((post) => (
              <div
                key={post.id}
                className="card"
                onClick={() => handlePostClick(post)} // Pass the clicked post
              >
                <h3>{post.title}</h3>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PostList;
