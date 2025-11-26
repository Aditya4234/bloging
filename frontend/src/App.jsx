import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import TrendingPosts from './pages/TrendingPosts';
import AuthorProfile from './pages/AuthorProfile';

function App() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="flex-center" style={{ minHeight: '100vh' }}>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <Router>
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <main style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/trending" element={<TrendingPosts />} />
                        <Route path="/author/:userId" element={<AuthorProfile />} />
                        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
                        <Route path="/post/:id" element={<PostDetail />} />
                        <Route path="/create" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                        <Route path="/edit/:id" element={user ? <CreatePost /> : <Navigate to="/login" />} />
                        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
                        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
