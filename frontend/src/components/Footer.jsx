import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <h3 className="gradient-text">BlogSpace</h3>
                        <p className="text-muted">Share your stories with the world</p>
                        <div className="social-links">
                            <a href="#" className="social-link"><FiGithub /></a>
                            <a href="#" className="social-link"><FiTwitter /></a>
                            <a href="#" className="social-link"><FiLinkedin /></a>
                            <a href="#" className="social-link"><FiMail /></a>
                        </div>
                    </div>

                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/about">About</a></li>
                            <li><a href="/contact">Contact</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Writing Guide</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>

                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="text-muted">© 2025 BlogSpace. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
