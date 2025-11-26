import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { FiClock, FiEye, FiHeart, FiEdit, FiTrash2, FiSend } from 'react-icons/fi';
import './PostDetail.css';

const PostDetail = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [isLiked, setIsLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        fetchPost();
        fetchComments();
    }, [id]);

    const fetchPost = async () => {
        try {
            const { data } = await api.get(`/posts/${id}`);
            setPost(data);
            setLikesCount(data.likes?.length || 0);
            setIsLiked(user && data.likes?.includes(user._id));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching post:', error);
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await api.get(`/posts/${id}/comments`);
            setComments(data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleLike = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        try {
            const { data } = await api.post(`/posts/${id}/like`);
            setLikesCount(data.likes);
            setIsLiked(data.isLiked);
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${id}`);
                navigate('/dashboard');
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const { data } = await api.post(`/posts/${id}/comments`, {
                content: newComment
            });
            setComments([data, ...comments]);
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                await api.delete(`/comments/${commentId}`);
                setComments(comments.filter(c => c._id !== commentId));
            } catch (error) {
                console.error('Error deleting comment:', error);
            }
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!post) {
        return (
            <div className="container">
                <div className="empty-state">
                    <h3>Post not found</h3>
                </div>
            </div>
        );
    }

    const isAuthor = user && post.author._id === user._id;

    return (
        <div className="post-detail">
            <div className="container">
                <article className="post-content fade-in">
                    {/* Post Header */}
                    <div className="post-header">
                        <div className="post-categories">
                            {post.categories?.map((category, index) => (
                                <span key={index} className="badge badge-primary">{category}</span>
                            ))}
                        </div>

                        <h1 className="post-title">{post.title}</h1>

                        <div className="post-meta">
                            <div className="author-section">
                                <img src={post.author.avatar} alt={post.author.name} className="author-avatar-large" />
                                <div>
                                    <p className="author-name">{post.author.name}</p>
                                    <p className="text-muted">{formatDate(post.createdAt)}</p>
                                </div>
                            </div>

                            <div className="post-stats">
                                <span className="stat">
                                    <FiClock /> {post.readTime} min read
                                </span>
                                <span className="stat">
                                    <FiEye /> {post.views} views
                                </span>
                                <button
                                    className={`stat-button ${isLiked ? 'liked' : ''}`}
                                    onClick={handleLike}
                                >
                                    <FiHeart /> {likesCount}
                                </button>
                            </div>
                        </div>

                        {isAuthor && (
                            <div className="post-actions">
                                <Link to={`/edit/${post._id}`} className="btn btn-secondary">
                                    <FiEdit /> Edit
                                </Link>
                                <button onClick={handleDelete} className="btn btn-outline" style={{ borderColor: 'var(--error)', color: 'var(--error)' }}>
                                    <FiTrash2 /> Delete
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Featured Image */}
                    {post.featuredImage && (
                        <div className="post-featured-image">
                            <img src={post.featuredImage} alt={post.title} />
                        </div>
                    )}

                    {/* Post Body */}
                    <div className="post-body" dangerouslySetInnerHTML={{ __html: post.content }} />

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="post-tags">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="badge badge-accent">#{tag}</span>
                            ))}
                        </div>
                    )}
                </article>

                {/* Comments Section */}
                <section className="comments-section">
                    <h3>Comments ({comments.length})</h3>

                    {user ? (
                        <form onSubmit={handleCommentSubmit} className="comment-form">
                            <textarea
                                className="input textarea"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                rows="3"
                            />
                            <button type="submit" className="btn btn-primary">
                                <FiSend /> Post Comment
                            </button>
                        </form>
                    ) : (
                        <div className="login-prompt">
                            <p>Please <Link to="/login">login</Link> to comment</p>
                        </div>
                    )}

                    <div className="comments-list">
                        {comments.map((comment) => (
                            <div key={comment._id} className="comment-item">
                                <img src={comment.author.avatar} alt={comment.author.name} className="comment-avatar" />
                                <div className="comment-content">
                                    <div className="comment-header">
                                        <span className="comment-author">{comment.author.name}</span>
                                        <span className="text-muted">{formatDate(comment.createdAt)}</span>
                                    </div>
                                    <p className="comment-text">{comment.content}</p>
                                    {user && comment.author._id === user._id && (
                                        <button
                                            className="delete-comment"
                                            onClick={() => handleDeleteComment(comment._id)}
                                        >
                                            <FiTrash2 /> Delete
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default PostDetail;
