import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { BlogPost } from '../types';
import './BlogPost.css';

const BlogPostComponent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      const fetchedPost = await blogAPI.getPost(postId);
      setPost(fetchedPost);
      setError(null);
    } catch (err) {
      setError('Failed to fetch blog post. Please try again later.');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post || !id) return;
    
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogAPI.deletePost(id);
        navigate('/');
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
      <div className="blog-post-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-post-container">
        <div className="error">{error}</div>
        <Link to="/" className="back-button">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-container">
        <div className="error">Post not found</div>
        <Link to="/" className="back-button">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="blog-post-container">
      <nav className="post-nav">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <div className="post-actions">
          <Link to={`/edit/${post.id}`} className="edit-button">
            Edit Post
          </Link>
          <button onClick={handleDelete} className="delete-button">
            Delete Post
          </button>
        </div>
      </nav>

      <article className="blog-post">
        <header className="post-header">
          <h1 className="post-title">{post.title}</h1>
          <div className="post-meta">
            <span className="post-author">By {post.author}</span>
            <span className="post-date">Published on {formatDate(post.created_at)}</span>
            {post.updated_at !== post.created_at && (
              <span className="post-updated">
                (Updated {formatDate(post.updated_at)})
              </span>
            )}
          </div>
        </header>

        <div className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>
    </div>
  );
};

export default BlogPostComponent;