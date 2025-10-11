import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { blogAPI } from '../services/api';
import { CreatePostData } from '../types';
import './CreatePost.css';

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);

  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    author: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing && id) {
      fetchPost(id);
    }
  }, [isEditing, id]);

  const fetchPost = async (postId: string) => {
    try {
      setLoading(true);
      const post = await blogAPI.getPost(postId);
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author
      });
      setError(null);
    } catch (err) {
      setError('Failed to fetch post for editing. Please try again.');
      console.error('Error fetching post:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditing && id) {
        await blogAPI.updatePost(id, formData);
      } else {
        await blogAPI.createPost(formData);
      }

      navigate('/');
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} post. Please try again.`);
      console.error(`Error ${isEditing ? 'updating' : 'creating'} post:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (isEditing && id) {
      navigate(`/post/${id}`);
    } else {
      navigate('/');
    }
  };

  if (isEditing && loading) {
    return (
      <div className="create-post-container">
        <div className="loading">Loading post...</div>
      </div>
    );
  }

  return (
    <div className="create-post-container">
      <nav className="form-nav">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
      </nav>

      <div className="form-container">
        <h1 className="form-title">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="post-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter post title"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              placeholder="Enter author name"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here..."
              rows={15}
              required
              disabled={loading}
            />
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={handleCancel}
              className="cancel-button"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-button"
              disabled={loading}
            >
              {loading 
                ? (isEditing ? 'Updating...' : 'Creating...') 
                : (isEditing ? 'Update Post' : 'Create Post')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;