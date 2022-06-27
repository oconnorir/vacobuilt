const { Post } = require('../models/post');
const { Category } = require('../models/category');
const { uid } = require('uid');

const getAllPosts = async (req, res) => {
  try {
    const allPosts = Post.find({});
    if (!allPosts) {
      res.send({ status: 404, message: 'There are no records to be found.' }); 
    } else {
      res.send({ status: 200, message: allPosts });
    }
  } catch(error) {
    console.log('ERROR GETTING POSTS', error);
    res.send({ status: 500, message: 'The server had a problem completing this request', error });
  }
}

const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) res.send({ status: 404, message: 'No record found for given argument.' }); 

    const post = await Post.find({ postId });
    res.send({ status: 200, message: post });
    return post;
  } catch(error) {
    console.log('ERROR GETTING POST BY ID', error);
    res.send({ status: 500, message: 'The server had a problem completing this request', error });
  }
}

const getCategories = async (req, res) => {
  try {
    const categories = Category.find({});
    if (!categories) {
      res.send({ status: 404, message: 'There are no records to be found.' }); 
    } else {
      res.send({ status: 200, message: categories });
    }
  } catch(error) {
    console.log('ERROR GETTING CATEGORIES', error);
    res.send({ status: 500, message: 'The server had a problem completing this request', error });
  }
}

const addPost = async (req, res) => {
  try {
    const { title, contents, categoryId } = req.body;
    const date = new Date();

    const post = new Post({
      postId: uid(42),
      title,
      contents,
      categoryId,
      createdAt: date
    })
    post.save();
    res.send({ status: 200, message: post });
    return post;
  } catch(error) {
    console.error('ERROR ADDING POST');
    console.error(error);
  }
}

const updatePost = async (req, res) => {
  try {
    const { postId, title, contents, categoryId } = req.body;
    if (!postId) res.send({ status: 404, message: 'There is no record found to update.' });

    const postToUpdate = Post.find({ postId });
    if (postToUpdate.length) {
      Post.updateOne({ postId }, { title, contents, categoryId });
      res.send({ status: 200, message: postToUpdate });
    } else {
      res.send({ status: 400, message: 'Something else went wrong.' });
    }
  } catch(error) {
    console.error('ERROR UPDATING POST');
    console.error(error);
  }
}

const deleteAllPosts = async (req, res) => {
  try {
    Post.remove({});
    res.send({ status: 200, message: 'You just deleted everything is the DB. Let\'s hope you meant to do that.' });
  } catch(error) {
    console.error('ERROR ATTEMPTING TO DELETE RECORDS');
    res.send({ status: 500, message: 'Server could not complete this request', error });
  }
}

const deletePostById = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) res.send({ status: 404, message: 'No record found for given argument.' }); 

    const post = await Post.find({ postId });
    post.deleteOne({ postId });
    res.send({ status: 200, message: post });
    return post; 
  } catch(error) {
    console.error('ERROR DELETING POST');
    res.send({ status: 500, message: 'Server could not complete this request', error });
  }
}

module.exports = {
  addPost,
  getPostById,
  getAllPosts,
  getCategories,
  updatePost,
  deleteAllPosts,
  deletePostById
};