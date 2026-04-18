// frontend/src/pages/SplashPage.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/SplashPage.module.css';

const SplashPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (user) {
        navigate(user.role === 'admin' ? '/admin' : '/home');
      } else {
        navigate('/home');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [user, navigate]);

  return (
    <div className={styles.splashPage}>
      <div className={styles.splashContent}>
        <div className={styles.logoContainer}>
          <span className={styles.logoIcon}>⚔️</span>
          <h1 className={styles.logoText}>ML<span className={styles.logoHighlight}>Folio</span></h1>
        </div>
        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress}></div>
        </div>
        <p className={styles.tagline}>Level Up Your Gaming Journey</p>
      </div>
    </div>
  );
};

export default SplashPage;