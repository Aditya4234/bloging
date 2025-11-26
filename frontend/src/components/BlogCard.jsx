import { Link } from 'react-router-dom';
import { FiClock, FiEye, FiHeart } from 'react-icons/fi';
import './BlogCard.css';

const BlogCard = ({ post }) => {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Link to={`/post/${post._id}`} className="blog-card card">
            {post.featuredImage && (
                <div className="blog-card-image">
                    <img src={post.featuredImage} alt={post.title} />
                </div>
            )}

            <div className="blog-card-content">
                <div className="blog-card-meta">
                    {post.categories && post.categories.length > 0 && (
                        <span className="badge badge-primary">{post.categories[0]}</span>
                    )}
                    <span className="text-muted flex" style={{ gap: '0.5rem', alignItems: 'center' }}>
                        <FiClock size={14} /> {post.readTime} min read
                    </span>
                </div>

                <h3 className="blog-card-title">{post.title}</h3>

                {post.excerpt && (
                    <p className="blog-card-excerpt text-secondary">{post.excerpt}</p>
                )}

                <div className="blog-card-footer">
                    <Link to={`/author/${post.author?._id}`} className="author-link">
                        <img
                            src={post.author?.avatar}
                            alt={post.author?.name}
                            className="author-avatar"
                        />
                        <div>
                            <p className="author-name">{post.author?.name}</p>
                            <p className="text-muted" style={{ fontSize: '0.875rem' }}>
                                {formatDate(post.createdAt)}
                            </p>
                        </div>
                    </Link>

                    <div className="blog-stats">
                        <span className="stat">
                            <FiEye size={16} /> {post.views || 0}
                        </span>
                        <span className="stat">
                            <FiHeart size={16} /> {post.likes?.length || 0}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
