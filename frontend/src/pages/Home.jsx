import { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import api from '../api/axios';
import BlogCard from '../components/BlogCard';
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const categories = ['Technology', 'Lifestyle', 'Travel', 'Food', 'Health', 'Business'];

    useEffect(() => {
        fetchPosts();
    }, [page, search, selectedCategory]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/posts', {
                params: {
                    page,
                    limit: 9,
                    search,
                    category: selectedCategory
                }
            });
            setPosts(data.posts);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        fetchPosts();
    };

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content fade-in">
                        <h1 className="hero-title">
                            Share Your <span className="gradient-text">Stories</span>
                            <br />With The World
                        </h1>
                        <p className="hero-subtitle">
                            Discover amazing stories, thinking, and expertise from writers on any topic.
                        </p>
                        <div className="hero-search">
                            <form onSubmit={handleSearch} className="search-form">
                                <FiSearch className="search-icon" />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="search-input"
                                />
                                <button type="submit" className="btn btn-primary">Search</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories */}
            <section className="categories">
                <div className="container">
                    <div className="category-pills">
                        <button
                            className={`category-pill ${!selectedCategory ? 'active' : ''}`}
                            onClick={() => { setSelectedCategory(''); setPage(1); }}
                        >
                            All
                        </button>
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => { setSelectedCategory(category); setPage(1); }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="posts-section">
                <div className="container">
                    {loading ? (
                        <div className="flex-center" style={{ minHeight: '400px' }}>
                            <div className="spinner"></div>
                        </div>
                    ) : posts.length > 0 ? (
                        <>
                            <div className="posts-grid grid grid-3">
                                {posts.map((post) => (
                                    <BlogCard key={post._id} post={post} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setPage(page - 1)}
                                        disabled={page === 1}
                                    >
                                        Previous
                                    </button>
                                    <span className="page-info">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => setPage(page + 1)}
                                        disabled={page === totalPages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="empty-state">
                            <h3>No posts found</h3>
                            <p className="text-muted">Try adjusting your search or filters</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;
