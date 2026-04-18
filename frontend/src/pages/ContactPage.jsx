// frontend/src/pages/ContactPage.js
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/ContactPage.module.css';

const ContactPage = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simulate API call - replace with actual backend endpoint
    try {
      // In a real app, you'd send this to your backend
      // await API.post('/contact', formData);
      
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again.');
    }
  };

  const socialLinks = [
    { platform: "Facebook", icon: "📘", url: "https://facebook.com", color: "#1877f2" },
    { platform: "Discord", icon: "🎮", url: "https://discord.com", color: "#5865f2" },
    { platform: "YouTube", icon: "📺", url: "https://youtube.com", color: "#ff0000" },
    { platform: "TikTok", icon: "🎵", url: "https://tiktok.com", color: "#000000" },
    { platform: "Instagram", icon: "📷", url: "https://instagram.com", color: "#e4405f" },
    { platform: "Twitter", icon: "🐦", url: "https://twitter.com", color: "#1da1f2" },
  ];

  return (
    <div className={styles.contactPage}>
      <div className={styles.hero}>
        <h1 className={styles.title}>
          <span className={styles.titleIcon}>📞</span>
          Contact Me
          <span className={styles.titleIcon}>💬</span>
        </h1>
        <p className={styles.subtitle}>
          Let's connect and grow together in the Land of Dawn!
        </p>
      </div>

      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo}>
            <h2>Let's Talk!</h2>
            <p>
              Whether you want to discuss strategies, share your own achievements,
              or just chat about Mobile Legends - I'd love to hear from you!
            </p>

            <div className={styles.infoBox}>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>📧</span>
                <div>
                  <h4>Email</h4>
                  <p>gamer@mlfolio.com</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>⏰</span>
                <div>
                  <h4>Response Time</h4>
                  <p>Within 24-48 hours</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoIcon}>🎮</span>
                <div>
                  <h4>Game ID</h4>
                  <p>MLFolio_Official (12345678)</p>
                </div>
              </div>
            </div>

            <div className={styles.socialSection}>
              <h3>Follow Me</h3>
              <div className={styles.socialGrid}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialCard}
                    style={{ '--social-color': social.color }}
                  >
                    <span className={styles.socialIcon}>{social.icon}</span>
                    <span>{social.platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.contactForm}>
            <h2>Send a Message</h2>
            {submitted && (
              <div className={styles.successMsg}>
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}
            {error && <div className={styles.errorMsg}>{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Subject *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Share your thoughts, questions, or just say hi!"
                />
              </div>

              <button type="submit" className={styles.submitBtn}>
                <span>✈️</span> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;