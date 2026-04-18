// frontend/src/pages/CreatePostPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import styles from '../styles/CreatePostPage.module.css';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('story');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'story', label: '📝 Battle Story', icon: '📝', color: '#3b82f6' },
    { value: 'strategy', label: '⚔️ Strategy Guide', icon: '⚔️', color: '#f59e0b' },
    { value: 'achievement', label: '🏆 Achievement', icon: '🏆', color: '#10b981' },
    { value: 'tournament', label: '🎯 Tournament Recap', icon: '🎯', color: '#ef4444' },
    { value: 'guide', label: '📚 Hero Guide', icon: '📚', color: '#8b5cf6' },
    { value: 'update', label: '🔄 Game Update', icon: '🔄', color: '#ec4899' },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setImagePreview('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('category', category);
    if (image) formData.append('image', image);

    try {
      const { data } = await API.post('/posts', formData);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to publish post');
    } finally {
      setLoading(false);
    }
  };

  // Character count for body
  const bodyLength = body.length;
  const minBodyLength = 50;
  const isBodyValid = bodyLength >= minBodyLength;

  return (
    <div className={styles.createPostPage}>
      <div className={styles.header}>
        <div className={styles.headerIcon}>✍️</div>
        <h1 className={styles.title}>Write a New Battle Story</h1>
        <p className={styles.subtitle}>
          Share your epic moments, strategies, and achievements with the community
        </p>
      </div>

      {error && <div className={styles.errorMsg}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Title Input */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.labelIcon}>📌</span>
            Title
            <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter an epic title for your story..."
            className={styles.titleInput}
            required
            maxLength={100}
          />
          <div className={styles.charCount}>
            {title.length}/100 characters
          </div>
        </div>

        {/* Category Selection */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.labelIcon}>🏷️</span>
            Category
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.categoryGrid}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                className={`${styles.categoryBtn} ${category === cat.value ? styles.categoryActive : ''}`}
                onClick={() => setCategory(cat.value)}
                style={{
                  '--category-color': cat.color
                }}
              >
                <span className={styles.categoryIcon}>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Editor */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.labelIcon}>📖</span>
            Content
            <span className={styles.required}>*</span>
          </label>
          <div className={styles.editorToolbar}>
            <button type="button" className={styles.toolbarBtn} onClick={() => setBody(body + '**Bold Text**')}>B</button>
            <button type="button" className={styles.toolbarBtn} onClick={() => setBody(body + '*Italic Text*')}>I</button>
            <button type="button" className={styles.toolbarBtn} onClick={() => setBody(body + '\n\n---\n\n')}>—</button>
            <button type="button" className={styles.toolbarBtn} onClick={() => setBody(body + '\n\n> Quote text\n\n')}>“</button>
          </div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Share your gaming experience, strategies, or achievements...
            
💡 Tips for a great story:
• Start with an engaging hook
• Share specific details about your gameplay
• Include what you learned
• Encourage discussion with questions"
            rows={14}
            required
            className={styles.contentInput}
          />
          <div className={styles.bodyStats}>
            <div className={styles.charCount}>
              📝 {bodyLength} characters
            </div>
            <div className={styles.wordCount}>
              📖 ~{Math.floor(bodyLength / 5)} words
            </div>
            <div className={styles.readTime}>
              ⏱️ ~{Math.ceil(bodyLength / 1000)} min read
            </div>
          </div>
          {!isBodyValid && bodyLength > 0 && (
            <div className={styles.warningMsg}>
              ⚠️ Please write at least {minBodyLength - bodyLength} more characters for a quality post
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div className={styles.formGroup}>
          <label className={styles.label}>
            <span className={styles.labelIcon}>🖼️</span>
            Cover Image
            <span className={styles.optional}>(Optional)</span>
          </label>
          <div className={styles.uploadArea}>
            {!imagePreview ? (
              <label className={styles.uploadLabel}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className={styles.fileInput}
                  hidden
                />
                <div className={styles.uploadPlaceholder}>
                  <span className={styles.uploadIcon}>📸</span>
                  <p>Click or drag to upload cover image</p>
                  <span className={styles.uploadHint}>PNG, JPG, GIF up to 5MB</span>
                </div>
              </label>
            ) : (
              <div className={styles.imagePreviewContainer}>
                <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
                <button 
                  type="button" 
                  className={styles.removeImageBtn}
                  onClick={handleRemoveImage}
                >
                  ✕ Remove Image
                </button>
              </div>
            )}
          </div>
          <p className={styles.imageHint}>
            💡 A great cover image makes your post stand out and attracts more readers!
          </p>
        </div>

        {/* Writing Tips */}
        <div className={styles.tipsCard}>
          <div className={styles.tipsHeader}>
            <span>💡</span>
            <h4>Writing Tips for Epic Stories</h4>
          </div>
          <ul className={styles.tipsList}>
            <li>🎯 Start with a hook that grabs attention</li>
            <li>📊 Use specific stats and numbers (e.g., "5-man wipe", "3 savages in a row")</li>
            <li>🎮 Share your hero build and strategy</li>
            <li>🤝 Encourage discussion by asking questions</li>
            <li>⭐ Add screenshots or clips to showcase your achievement</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className={styles.formActions}>
          <button 
            type="button" 
            onClick={() => navigate('/home')}
            className={styles.draftBtn}
          >
            Save as Draft
          </button>
          <button 
            type="submit" 
            className={styles.submitBtn} 
            disabled={loading || !isBodyValid}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                Publishing...
              </>
            ) : (
              <>
                🚀 Publish Story
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;