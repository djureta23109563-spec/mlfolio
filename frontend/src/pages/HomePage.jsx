// frontend/src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import styles from '../styles/HomePage.module.css';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Helper function to get image URL
  const getImageUrl = (filename) => {
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
    return `${baseUrl}/uploads/${filename}`;
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await API.get('/posts');
      setPosts(res.data);
      setFeaturedPosts(res.data.slice(0, 3));
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'strategy', 'achievements', 'tournament', 'guides', 'updates'];

  const filteredPosts = selectedCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getReadTime = (text) => {
    const wordsPerMinute = 200;
    const words = text.split(/\s/g).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading epic stories from the Land of Dawn...</p>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Welcome to <span className={styles.heroHighlight}>MLFolio</span> ⚔️
          </h1>
          <p className={styles.heroSubtitle}>
            Discover epic gaming achievements, strategies, and stories from the battlefield!
          </p>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>{posts.length}</span>
              <span className={styles.heroStatLabel}>Battle Stories</span>
            </div>
            <div className={styles.heroStat}>
              <span className={styles.heroStatNumber}>∞</span>
              <span className={styles.heroStatLabel}>Epic Moments</span>
            </div>
          </div>
        </div>
      </div>

      {featuredPosts.length > 0 && (
        <section className={styles.featuredSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🌟</span>
              Featured Stories
              <span className={styles.sectionLine}></span>
            </h2>
            <div className={styles.featuredGrid}>
              {featuredPosts.map((post, index) => (
                <Link to={`/posts/${post._id}`} key={post._id} className={`${styles.featuredCard} ${index === 0 ? styles.featuredMain : ''}`}>
                  {post.image && (
                    <div className={styles.featuredImageWrapper}>
                      <img 
                        src={getImageUrl(post.image)} 
                        alt={post.title}
                        className={styles.featuredImage}
                      />
                      <div className={styles.featuredOverlay}></div>
                    </div>
                  )}
                  <div className={styles.featuredContent}>
                    {index === 0 && <span className={styles.featuredBadge}>🔥 Hot Story</span>}
                    <h3 className={styles.featuredTitle}>{post.title}</h3>
                    <p className={styles.featuredExcerpt}>
                      {post.body.substring(0, 120)}...
                    </p>
                    <div className={styles.featuredMeta}>
                      <div className={styles.postAuthor}>
                        {post.author?.profilePic ? (
                          <img 
                            src={getImageUrl(post.author.profilePic)}
                            alt={post.author.name}
                            className={styles.authorAvatar}
                          />
                        ) : (
                          <div className={styles.authorAvatarPlaceholder}>
                            {post.author?.name?.charAt(0) || '👤'}
                          </div>
                        )}
                        <span>{post.author?.name || 'Unknown Warrior'}</span>
                      </div>
                      <span className={styles.readTime}>{getReadTime(post.body)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={styles.categorySection}>
        <div className={styles.container}>
          <div className={styles.categoryWrapper}>
            {categories.map(cat => (
              <button
                key={cat}
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat === 'all' && '🎮 All'}
                {cat === 'strategy' && '⚔️ Strategy'}
                {cat === 'achievements' && '🏆 Achievements'}
                {cat === 'tournament' && '🎯 Tournament'}
                {cat === 'guides' && '📚 Guides'}
                {cat === 'updates' && '🔄 Updates'}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.postsSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📖</span>
            Latest Battle Stories
            <span className={styles.sectionLine}></span>
          </h2>
          
          {filteredPosts.length === 0 ? (
            <div className={styles.noPosts}>
              <div className={styles.noPostsIcon}>🎮</div>
              <h3>No posts yet</h3>
              <p>Be the first to share your epic victory!</p>
              <Link to="/create-post" className={styles.createPostBtn}>
                Write Your Story →
              </Link>
            </div>
          ) : (
            <div className={styles.postsGrid}>
              {filteredPosts.map((post) => (
                <article key={post._id} className={styles.postCard}>
                  {post.image && (
                    <Link to={`/posts/${post._id}`} className={styles.postImageLink}>
                      <div className={styles.postImageWrapper}>
                        <img 
                          src={getImageUrl(post.image)} 
                          alt={post.title}
                          className={styles.postImage}
                        />
                        <div className={styles.postImageOverlay}>
                          <span>Read Story →</span>
                        </div>
                      </div>
                    </Link>
                  )}
                  
                  <div className={styles.postContent}>
                    <div className={styles.postHeader}>
                      <div className={styles.postCategory}>
                        {post.category === 'strategy' && '⚔️ Strategy'}
                        {post.category === 'achievements' && '🏆 Achievement'}
                        {post.category === 'tournament' && '🎯 Tournament'}
                        {!post.category && '📝 Story'}
                      </div>
                      <div className={styles.postDate}>
                        📅 {formatDate(post.createdAt)}
                      </div>
                    </div>
                    
                    <Link to={`/posts/${post._id}`} className={styles.postTitleLink}>
                      <h3 className={styles.postTitle}>{post.title}</h3>
                    </Link>
                    
                    <p className={styles.postExcerpt}>
                      {post.body.substring(0, 150)}...
                    </p>
                    
                    <div className={styles.postFooter}>
                      <div className={styles.postAuthor}>
                        {post.author?.profilePic ? (
                          <img 
                            src={getImageUrl(post.author.profilePic)}
                            alt={post.author.name}
                            className={styles.authorAvatar}
                          />
                        ) : (
                          <div className={styles.authorAvatarPlaceholder}>
                            {post.author?.name?.charAt(0) || '👤'}
                          </div>
                        )}
                        <div className={styles.authorInfo}>
                          <span className={styles.authorName}>{post.author?.name || 'Unknown Warrior'}</span>
                          <span className={styles.authorRole}>{post.author?.role === 'admin' ? '👑 Admin' : '🎮 Member'}</span>
                        </div>
                      </div>
                      
                      <div className={styles.postStats}>
                        <span className={styles.readTime}>
                          📖 {getReadTime(post.body)}
                        </span>
                      </div>
                    </div>
                    
                    <Link to={`/posts/${post._id}`} className={styles.readMoreBtn}>
                      Read Full Story
                      <span className={styles.readMoreArrow}>→</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;