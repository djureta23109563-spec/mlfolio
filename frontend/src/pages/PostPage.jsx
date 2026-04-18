// frontend/src/pages/PostPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import styles from '../styles/PostPage.module.css';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Helper function to get image URL - UPDATED with production URL
  const getImageUrl = (filename) => {
    if (!filename) return null;
    // Use environment variable or fallback to production Render URL
    const baseUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'https://mlfolio.onrender.com';
    return `${baseUrl}/uploads/${filename}`;
  };

  const fetchPost = useCallback(async () => {
    try {
      const res = await API.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      setError('Post not found or has been removed');
    } finally {
      setLoading(false);
    }
  }, [id]);

  const fetchComments = useCallback(async () => {
    try {
      const res = await API.get(`/comments/${id}`);
      setComments(res.data);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [fetchPost, fetchComments]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const res = await API.post(`/comments/${id}`, { body: newComment });
      setComments([res.data, ...comments]);
      setNewComment('');
    } catch (err) {
      setError('Failed to add comment. Please try again.');
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Delete this comment?')) return;

    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      setError('Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await API.delete(`/posts/${id}`);
      navigate('/home');
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  if (loading) return <div className={styles.loading}>Loading battle story...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!post) return <div className={styles.error}>Post not found</div>;

  const isAuthor = user && (user._id === post.author?._id || user.role === 'admin');

  return (
    <div className={styles.postPage}>
      <div className={styles.container}>
        <article className={styles.post}>
          {post.image && (
            <img 
              src={getImageUrl(post.image)}
              alt={post.title}
              className={styles.postImage}
              onError={(e) => {
                console.error('Post image failed to load:', getImageUrl(post.image));
                e.target.style.display = 'none';
              }}
            />
          )}
          
          <h1 className={styles.postTitle}>{post.title}</h1>
          
          <div className={styles.postMeta}>
            <div className={styles.postAuthor}>
              {post.author?.profilePic ? (
                <img 
                  src={getImageUrl(post.author.profilePic)}
                  alt={post.author.name}
                  className={styles.authorAvatar}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <span className={styles.authorAvatar}>👤</span>
              )}
              <span>{post.author?.name || 'Unknown Warrior'}</span>
            </div>
            <span className={styles.postDate}>
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className={styles.postBody}>
            {post.body.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {isAuthor && (
            <div className={styles.postActions}>
              <Link to={`/edit-post/${post._id}`} className={styles.editBtn}>
                ✏️ Edit Post
              </Link>
              <button onClick={handleDeletePost} className={styles.deleteBtn}>
                🗑️ Delete Post
              </button>
            </div>
          )}
        </article>

        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>
            Comments ({comments.length})
          </h2>

          {user ? (
            <form onSubmit={handleAddComment} className={styles.commentForm}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts on this battle story..."
                rows={4}
                required
              />
              <button type="submit" className={styles.submitCommentBtn}>
                💬 Post Comment
              </button>
            </form>
          ) : (
            <div className={styles.loginPrompt}>
              <p>Login to join the discussion! 🎮</p>
              <Link to="/login" className={styles.loginLink}>Login Now</Link>
            </div>
          )}

          <div className={styles.commentsList}>
            {comments.length === 0 ? (
              <p className={styles.noComments}>No comments yet. Be the first to comment!</p>
            ) : (
              comments.map(comment => (
                <div key={comment._id} className={styles.commentCard}>
                  <div className={styles.commentHeader}>
                    <div className={styles.commentAuthor}>
                      {comment.author?.profilePic ? (
                        <img 
                          src={getImageUrl(comment.author.profilePic)}
                          alt={comment.author.name}
                          className={styles.commentAvatar}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      ) : (
                        <span className={styles.commentAvatar}>👤</span>
                      )}
                      <span className={styles.commentAuthorName}>
                        {comment.author?.name || 'Anonymous'}
                      </span>
                    </div>
                    <span className={styles.commentDate}>
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className={styles.commentBody}>{comment.body}</p>
                  {(user && (user._id === comment.author?._id || user.role === 'admin')) && (
                    <button 
                      onClick={() => handleDeleteComment(comment._id)}
                      className={styles.deleteCommentBtn}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostPage;