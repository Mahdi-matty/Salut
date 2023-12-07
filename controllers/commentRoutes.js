const express = require('express');
const router = express.Router();
const Comment  = require('../models/comments');

router.post('/', async (req, res) => {
  try {
    console.log('Enters to comments');
    const { text, user_id, post_id } = req.body;

    const newComment = await Comment.create({ text, user_id, post_id });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error creating comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const userComments = await Comment.findAll({
      where: { user_id: user_id },
    });

    res.json(userComments);
  } catch (error) {
    console.error('Error fetching user comments:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;