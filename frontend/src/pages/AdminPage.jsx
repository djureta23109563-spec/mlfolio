// frontend/src/pages/AdminPage.js
import { useState, useEffect } from 'react';
import API from '../api/axios';
import styles from '../styles/AdminPage.module.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, postsRes] = await Promise.all([
        API.get('/admin/users'),
        API.get('/admin/posts')
      ]);
      setUsers(usersRes.data);
      setPosts(postsRes.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      const { data } = await API.put(`/admin/users/${userId}/status`);
      setUsers(users.map(u => u._id === userId ? data.user : u));
    } catch (err) {
      console.error('Error toggling user status:', err);
    }
  };

  const removePost = async (postId) => {
    if (!window.confirm('Remove this post? It will be hidden from the public.')) return;
    
    try {
      await API.put(`/admin/posts/${postId}/remove`);
      setPosts(posts.map(p => p._id === postId ? { ...p, status: 'removed' } : p));
    } catch (err) {
      console.error('Error removing post:', err);
    }
  };

  if (loading) return <div className={styles.loading}>Loading admin dashboard...</div>;

  return (
    <div className={styles.adminPage}>
      <h2 className={styles.title}>Admin Dashboard 👑</h2>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'users' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('users')}
        >
          Members ({users.length})
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'posts' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('posts')}
        >
          All Posts ({posts.length})
        </button>
      </div>

      {activeTab === 'users' && (
        <div className={styles.tabContent}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${user.status === 'active' ? styles.statusActive : styles.statusInactive}`}>
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => toggleUserStatus(user._id)}
                      className={`${styles.actionBtn} ${user.status === 'active' ? styles.btnDanger : styles.btnSuccess}`}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'posts' && (
        <div className={styles.tabContent}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {posts.map(post => (
                <tr key={post._id}>
                  <td>{post.title}</td>
                  <td>{post.author?.name || 'Unknown'}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${post.status === 'published' ? styles.statusPublished : styles.statusRemoved}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    {post.status === 'published' && (
                      <button
                        onClick={() => removePost(post._id)}
                        className={`${styles.actionBtn} ${styles.btnDanger}`}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPage;