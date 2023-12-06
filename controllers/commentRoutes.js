const express = require('express');
const router = express.Router();
const { Comment } = require('../models');

router.post('/api/comments', async (req, res) => {
  try {
    const { text, user_id, post_id } = req.body;

    const newComment = await Comment.create({ text, user_id, post_id });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;