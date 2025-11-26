import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut, FiEdit, FiGrid } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setIsDropdownOpen(false);
    };

    return (
        <nav className="navbar glass">
            <div className="container">
                <div className="navbar-content">
                    <Link to="/" className="navbar-brand">
                        <span className="gradient-text">BlogSpace</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="navbar-menu desktop-menu">
                        <Link to="/" className="nav-link">Home</Link>
                        <Link to="/trending" className="nav-link">Trending</Link>
                        {user ? (
                            <>
                                <Link to="/create" className="nav-link">
                                    <FiEdit /> Write
                                </Link>
                                <Link to="/dashboard" className="nav-link">
                                    <FiGrid /> Dashboard
                                </Link>
                                <div className="user-dropdown">
                                    <button
                                        className="user-avatar"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <img src={user.avatar} alt={user.name} />
                                    </button>
                                    {isDropdownOpen && (
                                        <div className="dropdown-menu">
                                            <Link to="/profile" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                                                <FiUser /> Profile
                                            </Link>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                <FiLogOut /> Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline">Login</Link>
                                <Link to="/register" className="btn btn-primary">Get Started</Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <FiX /> : <FiMenu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="mobile-menu">
                        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                        <Link to="/trending" className="nav-link" onClick={() => setIsMenuOpen(false)}>Trending</Link>
                        {user ? (
                            <>
                                <Link to="/create" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    <FiEdit /> Write
                                </Link>
                                <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    <FiGrid /> Dashboard
                                </Link>
                                <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    <FiUser /> Profile
                                </Link>
                                <button className="nav-link" onClick={handleLogout}>
                                    <FiLogOut /> Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="btn btn-outline" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                <Link to="/register" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
