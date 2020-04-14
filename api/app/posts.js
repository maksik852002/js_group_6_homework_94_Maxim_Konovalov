const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const upload = require('../multer').uploads;

const Post = require('../models/Post');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const posts = await Post.find({user: {$in: [req.user._id, ...req.user.subscription]}}).populate('user', ['username', 'displayName']);
  res.send(posts);
});

router.get('/tags', async (req, res) => {
  const tags = await Post.distinct('tags');

  return res.send(tags);
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).send({message: 'Not found'});
    }

    res.send(post);
  } catch (e) {
    res.status(404).send({message: 'Not found'});
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const postData = {
      title: req.body.title,
      text: req.body.text,
      tags: JSON.parse(req.body.tags),
      user: req.user._id
    };

    if (req.body.text === 'null') {
      postData.text = JSON.parse(req.body.text);
    }

    if (req.file) {
      postData.image = req.file.filename;
    }

    const post = new Post(postData);

    await post.save();

    return res.send({id: post._id});
  } catch (e) {
    if (e instanceof ValidationError) {
      return res.status(400).send(e);
    } else {
      return res.sendStatus(500);
    }
  }
});



module.exports = router;