// src/PostList.js
//import React from "react";

import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data); // Axios returns data inside a "data" field
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // Dependency array to run the effect only once on component mount

  return (
    <div>
      <h1>Post List</h1>
      {loading && <p>Loading posts...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
