import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { BlogPost } from '../types';
import './BlogList.css';

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await blogAPI.getPosts();
      setPosts(fetchedPosts);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blog posts. Please try again later.');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogAPI.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        setError('Failed to delete post. Please try again.');
        console.error('Error deleting post:', err);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="blog-list">
        <div className="loading">Loading posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-list">
        <div className="error">{error}</div>
        <button onClick={fetchPosts} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="blog-list">
      <div className="blog-list-header">
        <h1>All Blog Posts</h1>
        <Link to="/create" className="create-button">
          Create New Post
        </Link>
      </div>
      
      {posts.length === 0 ? (
        <div className="no-posts">
          <p>No blog posts found.</p>
          <Link to="/create" className="create-first-post">
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              <div className="post-header">
                <h2 className="post-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>
                <div className="post-meta">
                  <span className="post-author">By {post.author}</span>
                  <span className="post-date">{formatDate(post.created_at)}</span>
                </div>
              </div>
              
              <div className="post-preview">
                {post.content.length > 200 
                  ? `${post.content.substring(0, 200)}...` 
                  : post.content}
              </div>
              
              <div className="post-actions">
                <Link to={`/post/${post.id}`} className="read-more">
                  Read More
                </Link>
                <Link to={`/edit/${post.id}`} className="edit-button">
                  Edit
                </Link>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;