// frontend/src/components/PostCard.jsx
import { Link } from 'react-router-dom';
import styles from '../styles/PostCard.module.css';

const PostCard = ({ post }) => {
  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <Link to={`/posts/${post._id}`} className={styles.postCard}>
      {post.image && (
        <div className={styles.imageContainer}>
          <img 
            src={`http://localhost:5000/uploads/${post.image}`} 
            alt={post.title}
            className={styles.postImage}
          />
          {post.author?.role === 'admin' && (
            <span className={styles.adminBadge}>👑 Admin Pick</span>
          )}
        </div>
      )}
      
      <div className={styles.postContent}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        <p className={styles.postExcerpt}>{truncateText(post.body)}</p>
        
        <div className={styles.postFooter}>
          <div className={styles.postAuthor}>
            {post.author?.profilePic ? (
              <img 
                src={`http://localhost:5000/uploads/${post.author.profilePic}`}
                alt={post.author.name}
                className={styles.authorAvatar}
              />
            ) : (
              <div className={styles.authorAvatarPlaceholder}>
                {post.author?.name?.charAt(0) || '👤'}
              </div>
            )}
            <span className={styles.authorName}>{post.author?.name || 'Unknown Warrior'}</span>
          </div>
          
          <div className={styles.postStats}>
            <span className={styles.postDate}>
              📅 {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        <div className={styles.readMore}>
          Read Story <span className={styles.readMoreArrow}>→</span>
        </div>
      </div>
    </Link>
  );
};

export default PostCard;