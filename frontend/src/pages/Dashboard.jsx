import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { FiEdit, FiTrash2, FiEye, FiHeart, FiPlus } from 'react-icons/fi';
import './Dashboard.css';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0
    });

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const { data } = await api.get(`/posts/user/${user._id}`);
            setPosts(data);

            // Calculate stats
            const totalViews = data.reduce((sum, post) => sum + (post.views || 0), 0);
            const totalLikes = data.reduce((sum, post) => sum + (post.likes?.length || 0), 0);

            setStats({
                totalPosts: data.length,
                totalViews,
                totalLikes
            });

            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await api.delete(`/posts/${id}`);
                setPosts(posts.filter(post => post._id !== id));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard-header">
                    <div>
                        <h1>My Dashboard</h1>
                        <p className="text-muted">Manage your blog posts</p>
                    </div>
                    <Link to="/create" className="btn btn-primary">
                        <FiPlus /> New Post
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                    <div className="stat-card glass">
                        <div className="stat-icon" style={{ background: 'var(--gradient-primary)' }}>
                            <FiEdit />
                        </div>
                        <div>
                            <p className="stat-label">Total Posts</p>
                            <p className="stat-value">{stats.totalPosts}</p>
                        </div>
                    </div>

                    <div className="stat-card glass">
                        <div className="stat-icon" style={{ background: 'var(--gradient-accent)' }}>
                            <FiEye />
                        </div>
                        <div>
                            <p className="stat-label">Total Views</p>
                            <p className="stat-value">{stats.totalViews}</p>
                        </div>
                    </div>

                    <div className="stat-card glass">
                        <div className="stat-icon" style={{ background: 'var(--gradient-secondary)' }}>
                            <FiHeart />
                        </div>
                        <div>
                            <p className="stat-label">Total Likes</p>
                            <p className="stat-value">{stats.totalLikes}</p>
                        </div>
                    </div>
                </div>

                {/* Posts Table */}
                <div className="posts-table-container">
                    <h2>Your Posts</h2>

                    {loading ? (
                        <div className="flex-center" style={{ minHeight: '300px' }}>
                            <div className="spinner"></div>
                        </div>
                    ) : posts.length > 0 ? (
                        <div className="posts-table">
                            {posts.map((post) => (
                                <div key={post._id} className="post-row card">
                                    <div className="post-row-content">
                                        <div className="post-row-main">
                                            <h3 className="post-row-title">
                                                <Link to={`/post/${post._id}`}>{post.title}</Link>
                                            </h3>
                                            <div className="post-row-meta">
                                                <span className={`status-badge ${post.status}`}>
                                                    {post.status}
                                                </span>
                                                <span className="text-muted">{formatDate(post.createdAt)}</span>
                                                {post.categories?.length > 0 && (
                                                    <span className="badge badge-primary">{post.categories[0]}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="post-row-stats">
                                            <span className="stat">
                                                <FiEye /> {post.views || 0}
                                            </span>
                                            <span className="stat">
                                                <FiHeart /> {post.likes?.length || 0}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="post-row-actions">
                                        <Link to={`/edit/${post._id}`} className="btn btn-secondary btn-sm">
                                            <FiEdit /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post._id)}
                                            className="btn btn-outline btn-sm"
                                            style={{ borderColor: 'var(--error)', color: 'var(--error)' }}
                                        >
                                            <FiTrash2 /> Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <h3>No posts yet</h3>
                            <p className="text-muted">Start writing your first blog post!</p>
                            <Link to="/create" className="btn btn-primary mt-lg">
                                <FiPlus /> Create Post
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
