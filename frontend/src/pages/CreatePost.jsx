import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import api from '../api/axios';
import { FiSave } from 'react-icons/fi';
import './CreatePost.css';

const CreatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [status, setStatus] = useState('draft');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const categoryOptions = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business'];

    useEffect(() => {
        if (id) {
            fetchPost();
        }
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data } = await api.get(`/posts/${id}`);
            setTitle(data.title);
            setContent(data.content);
            setExcerpt(data.excerpt || '');
            setFeaturedImage(data.featuredImage || '');
            setCategories(data.categories || []);
            setTags(data.tags || []);
            setStatus(data.status);
        } catch (error) {
            console.error('Error fetching post:', error);
            setError('Failed to load post');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const postData = {
                title,
                content,
                excerpt,
                featuredImage,
                categories,
                tags,
                status
            };

            if (id) {
                await api.put(`/posts/${id}`, postData);
            } else {
                await api.post('/posts', postData);
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving post:', error);
            setError(error.response?.data?.message || 'Failed to save post');
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryToggle = (category) => {
        if (categories.includes(category)) {
            setCategories(categories.filter(c => c !== category));
        } else {
            setCategories([...categories, category]);
        }
    };

    const handleTagsChange = (e) => {
        const tagString = e.target.value;
        setTags(tagString.split(',').map(tag => tag.trim()).filter(tag => tag));
    };

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['blockquote', 'code-block'],
            ['link', 'image'],
            ['clean']
        ]
    };

    return (
        <div className="create-post">
            <div className="container">
                <div className="create-post-header">
                    <h1>{id ? 'Edit Post' : 'Create New Post'}</h1>
                </div>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                <form onSubmit={handleSubmit} className="post-form">
                    <div className="form-group">
                        <label className="label">Title *</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Enter post title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Excerpt</label>
                        <textarea
                            className="input"
                            placeholder="Brief description of your post"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows="2"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Featured Image URL</label>
                        <input
                            type="url"
                            className="input"
                            placeholder="https://example.com/image.jpg"
                            value={featuredImage}
                            onChange={(e) => setFeaturedImage(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Content *</label>
                        <ReactQuill
                            theme="snow"
                            value={content}
                            onChange={setContent}
                            modules={modules}
                            className="quill-editor"
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Categories</label>
                        <div className="category-checkboxes">
                            {categoryOptions.map((category) => (
                                <label key={category} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={categories.includes(category)}
                                        onChange={() => handleCategoryToggle(category)}
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="label">Tags (comma separated)</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="react, javascript, web development"
                            value={tags.join(', ')}
                            onChange={handleTagsChange}
                        />
                    </div>

                    <div className="form-group">
                        <label className="label">Status</label>
                        <select
                            className="input"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="draft">Draft</option>
                            <option value="published">Published</option>
                        </select>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/dashboard')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            <FiSave /> {loading ? 'Saving...' : (id ? 'Update Post' : 'Create Post')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
