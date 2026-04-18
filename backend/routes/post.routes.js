// backend/routes/post.routes.js
const express = require('express');
const Post = require('../models/Post');
const { protect } = require('../middleware/auth.middleware');
const { memberOrAdmin } = require('../middleware/role.middleware');
const upload = require('../middleware/upload');
const router = express.Router();

// GET /api/posts - Public: all published posts (newest first)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' })
      .populate('author', 'name profilePic')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/posts/:id - Public: single post by ID
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name profilePic');
    if (!post || post.status === 'removed')
      return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error('Error fetching post:', err);
    res.status(500).json({ message: err.message });
  }
});

// POST /api/posts - Member or Admin: create new post with image upload
router.post('/', protect, memberOrAdmin, (req, res, next) => {
  // Handle multer error specifically
  upload.single('image')(req, res, function(err) {
    if (err) {
      console.error('Multer error:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const { title, body, category } = req.body;
    
    // Debug logging
    console.log('Creating post with:');
    console.log('- Title:', title);
    console.log('- Body length:', body?.length);
    console.log('- File received:', req.file ? req.file.filename : 'No file');
    console.log('- Category:', category);
    
    const image = req.file ? req.file.filename : '';
    
    const post = await Post.create({
      title,
      body,
      image,
      category: category || 'story',
      author: req.user._id
    });
    
    await post.populate('author', 'name profilePic');
    console.log('Post created successfully with ID:', post._id);
    res.status(201).json(post);
  } catch (err) {
    console.error('Post creation error:', err);
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/posts/:id - Edit: only post owner OR admin
router.put('/:id', protect, memberOrAdmin, (req, res, next) => {
  upload.single('image')(req, res, function(err) {
    if (err) {
      console.error('Multer error on update:', err);
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
      }
      return res.status(400).json({ message: err.message });
    }
    next();
  });
}, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.body) post.body = req.body.body;
    if (req.body.category) post.category = req.body.category;
    if (req.file) {
      console.log('Updating image from', post.image, 'to', req.file.filename);
      post.image = req.file.filename;
    }
    
    await post.save();
    console.log('Post updated successfully:', post._id);
    res.json(post);
  } catch (err) {
    console.error('Post update error:', err);
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/posts/:id - Delete: only post owner OR admin
router.delete('/:id', protect, memberOrAdmin, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const isOwner = post.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await post.deleteOne();
    console.log('Post deleted successfully:', req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Post delete error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;