// frontend/src/components/Footer.js
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  const { user } = useAuth();
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerSection}>
            <div className={styles.logo}>
              <span className={styles.logoIcon}>⚔️</span>
              <span className={styles.logoText}>ML<span className={styles.logoHighlight}>Folio</span></span>
            </div>
            <p className={styles.description}>
              Your ultimate gaming portfolio platform. Share achievements, 
              inspire others, and level up together in the Land of Dawn!
            </p>
            <div className={styles.socialLinks}>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>📘</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>🎮</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>📺</a>
              <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>🐦</a>
            </div>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <ul className={styles.linkList}>
              <li><Link to="/home">🏠 Home</Link></li>
              <li><Link to="/about">📖 About</Link></li>
              <li><Link to="/contact">📞 Contact</Link></li>
              {user && (
                <li><Link to="/profile">👤 My Profile</Link></li>
              )}
              {user?.role === 'admin' && (
                <li><Link to="/admin">⚙️ Admin Panel</Link></li>
              )}
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Resources</h3>
            <ul className={styles.linkList}>
              <li><a href="#">🎯 Game Guides</a></li>
              <li><a href="#">🏆 Tournament Tips</a></li>
              <li><a href="#">⭐ Hero Strategies</a></li>
              <li><a href="#">📊 Match Analysis</a></li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.sectionTitle}>Newsletter</h3>
            <p className={styles.newsletterText}>
              Get the latest gaming tips and updates!
            </p>
            <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className={styles.newsletterInput}
              />
              <button type="submit" className={styles.newsletterBtn}>
                Subscribe ✉️
              </button>
            </form>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>&copy; {currentYear} MLFolio. All rights reserved.</p>
          <div className={styles.footerBottomLinks}>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;