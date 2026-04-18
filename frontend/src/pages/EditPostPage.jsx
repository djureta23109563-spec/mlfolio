// frontend/src/pages/EditPostPage.jsx
import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import styles from '../styles/EditPostPage.module.css';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // user IS used for permission check below
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await API.get(`/posts/${id}`);
      
      // Check if user is author or admin - user IS used here
      if (data.author?._id !== user?._id && user?.role !== 'admin') {
        navigate('/home');
        return;
      }
      
      setTitle(data.title);
      setBody(data.body);
      setCurrentImage(data.image);
      setLoading(false);
    } catch (err) {
      setError('Post not found');
      setLoading(false);
    }
  }, [id, user, navigate]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

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
    // Optional: You can also add a flag to delete the current image
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    if (image) formData.append('image', image);

    try {
      await API.put(`/posts/${id}`, formData);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className={styles.loading}>Loading post...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.editPostPage}>
      <h2 className={styles.title}>Edit Battle Story ✏️</h2>

      {error && <div className={styles.errorMsg}>{error}</div>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Content</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={12}
            required
          />
        </div>

        {/* Allow ALL users to update images */}
        <div className={styles.formGroup}>
          <label>Cover Image (Optional)</label>
          
          {/* Show current image if exists and no new image selected */}
          {currentImage && !image && !imagePreview && (
            <div className={styles.currentImage}>
              <p>Current image:</p>
              <img 
                src={`http://localhost:5000/uploads/${currentImage}`}
                alt="Current"
                className={styles.currentImagePreview}
              />
              <button 
                type="button" 
                className={styles.removeImageBtn}
                onClick={handleRemoveImage}
              >
                Remove Image
              </button>
            </div>
          )}
          
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          
          {imagePreview && (
            <div className={styles.imagePreview}>
              <p>New image preview:</p>
              <img src={imagePreview} alt="Preview" />
              <button 
                type="button" 
                className={styles.removeImageBtn}
                onClick={handleRemoveImage}
              >
                ✕ Remove
              </button>
            </div>
          )}
          
          <p className={styles.imageHint}>
            💡 Tip: Upload a new image to replace the current one (Max 5MB)
          </p>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.saveBtn} disabled={submitting}>
            {submitting ? 'Saving...' : 'Save Changes'}
          </button>
          <button 
            type="button" 
            onClick={() => navigate(`/posts/${id}`)}
            className={styles.cancelBtn}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostPage;