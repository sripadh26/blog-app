const express = require('express');
const router = express.Router();
const Post = require('../models/post'); // Mongoose model

// Show form to create new post
router.get('/new', (req, res) => {
    res.render('new-post');
});

// Get all blog posts
router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.render('posts', { posts });
});

// Show form to edit a post
router.get('/:id/edit', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.render('edit-post', { post });
    } catch (err) {
        res.status(404).send('Invalid post ID');
    }
});

// Get a single blog post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) return res.status(404).send('Post not found');
        res.render('post-detail', { post });
    } catch (err) {
        res.status(404).send('Invalid post ID');
    }
});

// Create a new post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).send('Title and content are required');

    const newPost = new Post({ title, content });
    await newPost.save();
    res.redirect(`/posts/${newPost._id}`);
});

// Update a post
router.post('/:id/update', async (req, res) => {
    const { title, content } = req.body;
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { title, content });
        if (!post) return res.status(404).send('Post not found');
        res.redirect(`/posts/${req.params.id}`);
    } catch (err) {
        res.status(400).send('Failed to update post');
    }
});

// Delete a post
router.post('/:id/delete', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.redirect('/posts');
    } catch (err) {
        res.status(400).send('Failed to delete post');
    }
});

module.exports = router;
