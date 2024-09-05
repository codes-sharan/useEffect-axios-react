// src/PostList.js
import { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activePost, setActivePost] = useState(null); // Track the clicked post

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

  const handleClick = (id) => {
    setActivePost(activePost === id ? null : id); // Toggle active post
  };

  return (
    <div className="post-list">
      <h1>Post List</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error}</p>}
      <div className="card-container">
        {posts.map((post) => (
          <div
            key={post.id}
            className="card"
            onClick={() => handleClick(post.id)}
          >
            <h3>{post.title}</h3>
            {activePost === post.id && (
              <div className="card-content">
                <p>{post.body}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
