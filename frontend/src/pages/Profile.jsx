import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import { FiUser, FiMail, FiSave } from 'react-icons/fi';
import './Profile.css';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [name, setName] = useState(user?.name || '');
    const [bio, setBio] = useState(user?.bio || '');
    const [avatar, setAvatar] = useState(user?.avatar || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });
        setLoading(true);

        try {
            const { data } = await api.put('/auth/profile', {
                name,
                bio,
                avatar
            });

            updateUser(data);
            setMessage({ type: 'success', text: 'Profile updated successfully!' });
        } catch (error) {
            console.error('Error updating profile:', error);
            setMessage({
                type: 'error',
                text: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="profile-page">
            <div className="container">
                <div className="profile-container">
                    <div className="profile-header">
                        <h1>My Profile</h1>
                        <p className="text-muted">Update your personal information</p>
                    </div>

                    {message.text && (
                        <div className={`${message.type}-message`}>
                            {message.text}
                        </div>
                    )}

                    <div className="profile-content">
                        <div className="profile-sidebar">
                            <div className="profile-avatar-section">
                                <img src={avatar || user?.avatar} alt={name} className="profile-avatar-large" />
                                <h3>{name || user?.name}</h3>
                                <p className="text-muted">{user?.email}</p>
                            </div>
                        </div>

                        <div className="profile-form-section">
                            <form onSubmit={handleSubmit} className="profile-form">
                                <div className="form-group">
                                    <label className="label">Name</label>
                                    <div className="input-with-icon">
                                        <FiUser className="input-icon" />
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="label">Email</label>
                                    <div className="input-with-icon">
                                        <FiMail className="input-icon" />
                                        <input
                                            type="email"
                                            className="input"
                                            value={user?.email}
                                            disabled
                                            style={{ opacity: 0.6, cursor: 'not-allowed' }}
                                        />
                                    </div>
                                    <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                        Email cannot be changed
                                    </p>
                                </div>

                                <div className="form-group">
                                    <label className="label">Bio</label>
                                    <textarea
                                        className="input textarea"
                                        placeholder="Tell us about yourself"
                                        value={bio}
                                        onChange={(e) => setBio(e.target.value)}
                                        rows="4"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="label">Avatar URL</label>
                                    <input
                                        type="url"
                                        className="input"
                                        placeholder="https://example.com/avatar.jpg"
                                        value={avatar}
                                        onChange={(e) => setAvatar(e.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block"
                                    disabled={loading}
                                >
                                    <FiSave /> {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
