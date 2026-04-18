// frontend/src/components/Navbar.js
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>⚔️</span>
          <span className={styles.logoText}>ML<span className={styles.logoHighlight}>Folio</span></span>
        </Link>

        <ul className={styles.navMenu}>
          <li><Link to="/home" className={styles.navLink}>Home</Link></li>
          <li><Link to="/about" className={styles.navLink}>About</Link></li>
          <li><Link to="/contact" className={styles.navLink}>Contact</Link></li>
          
          {user ? (
            <>
              {user.role === 'admin' && (
                <li><Link to="/admin" className={styles.navLink}>Admin</Link></li>
              )}
              <li><Link to="/create-post" className={styles.navLink}>Write</Link></li>
              <li><Link to="/profile" className={styles.navLink}>Profile</Link></li>
              <li>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" className={styles.navLink}>Login</Link></li>
              <li><Link to="/register" className={styles.registerBtn}>Register</Link></li>
            </>
          )}
          
          <li>
            <button onClick={toggleDarkMode} className={styles.themeToggle}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;