import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';
import { FiTrendingUp, FiClock } from 'react-icons/fi';
import './TrendingPosts.css';

const TrendingPosts = () => {
    const [trendingPosts, setTrendingPosts] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrendingPosts();
    }, []);

    const fetchTrendingPosts = async () => {
        try {
            // Fetch all posts and sort by views + likes
            const { data } = await api.get('/posts', {
                params: { limit: 20 }
            });

            // Sort by engagement (views + likes)
            const sorted = [...data.posts].sort((a, b) => {
                const engagementA = (a.views || 0) + (a.likes?.length || 0) * 10;
                const engagementB = (b.views || 0) + (b.likes?.length || 0) * 10;
                return engagementB - engagementA;
            });

            setTrendingPosts(sorted.slice(0, 6));
            setRecentPosts(data.posts.slice(0, 6));
            setLoading(false);
        } catch (error) {
            console.error('Error fetching trending posts:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '60vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="trending-page">
            <div className="container">
                {/* Hero Section */}
                <div className="trending-hero">
                    <h1>
                        <FiTrendingUp className="trending-icon" />
                        Trending Now
                    </h1>
                    <p className="text-secondary">
                        Discover the most popular and engaging content on BlogSpace
                    </p>
                </div>

                {/* Trending Posts */}
                <section className="trending-section">
                    <h2>🔥 Most Popular</h2>
                    <div className="posts-grid grid grid-3">
                        {trendingPosts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                </section>

                {/* Recent Posts */}
                <section className="recent-section">
                    <h2>
                        <FiClock /> Latest Posts
                    </h2>
                    <div className="posts-grid grid grid-3">
                        {recentPosts.map((post) => (
                            <BlogCard key={post._id} post={post} />
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <div className="trending-cta glass">
                    <h3>Want to see your post here?</h3>
                    <p className="text-muted">
                        Create engaging content and watch it climb the trending charts!
                    </p>
                    <Link to="/create" className="btn btn-primary">
                        Start Writing
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TrendingPosts;
