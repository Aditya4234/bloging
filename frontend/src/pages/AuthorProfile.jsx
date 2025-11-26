import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';
import { FiUser, FiEdit, FiCalendar } from 'react-icons/fi';
import './AuthorProfile.css';

const AuthorProfile = () => {
    const { userId } = useParams();
    const [author, setAuthor] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalPosts: 0,
        totalViews: 0,
        totalLikes: 0
    });

    useEffect(() => {
        fetchAuthorData();
    }, [userId]);

    const fetchAuthorData = async () => {
        try {
            // Fetch author info (we'll need to add this endpoint)
            const { data: posts } = await api.get(`/posts/user/${userId}`);
            setPosts(posts);

            if (posts.length > 0) {
                setAuthor(posts[0].author);

                // Calculate stats
                const totalViews = posts.reduce((sum, post) => sum + (post.views || 0), 0);
                const totalLikes = posts.reduce((sum, post) => sum + (post.likes?.length || 0), 0);

                setStats({
                    totalPosts: posts.length,
                    totalViews,
                    totalLikes
                });
            }

            setLoading(false);
        } catch (error) {
            console.error('Error fetching author data:', error);
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    if (!author) {
        return (
            <div className="container">
                <div className="empty-state">
                    <h3>Author not found</h3>
                </div>
            </div>
        );
    }

    return (
        <div className="author-profile">
            <div className="container">
                {/* Author Header */}
                <div className="author-header glass">
                    <div className="author-avatar-section">
                        <img src={author.avatar} alt={author.name} className="author-avatar-xl" />
                    </div>

                    <div className="author-info-section">
                        <h1>{author.name}</h1>
                        {author.bio && <p className="author-bio">{author.bio}</p>}

                        <div className="author-meta">
                            <span className="meta-item">
                                <FiUser /> {author.email}
                            </span>
                            <span className="meta-item">
                                <FiCalendar /> Joined {formatDate(author.createdAt)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="author-stats">
                    <div className="stat-box">
                        <FiEdit className="stat-icon" />
                        <div>
                            <p className="stat-number">{stats.totalPosts}</p>
                            <p className="stat-label">Posts</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div>
                            <p className="stat-number">{stats.totalViews}</p>
                            <p className="stat-label">Total Views</p>
                        </div>
                    </div>
                    <div className="stat-box">
                        <div>
                            <p className="stat-number">{stats.totalLikes}</p>
                            <p className="stat-label">Total Likes</p>
                        </div>
                    </div>
                </div>

                {/* Author's Posts */}
                <section className="author-posts">
                    <h2>Posts by {author.name}</h2>
                    {posts.length > 0 ? (
                        <div className="posts-grid grid grid-3">
                            {posts.map((post) => (
                                <BlogCard key={post._id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state">
                            <p>No posts yet</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default AuthorProfile;
