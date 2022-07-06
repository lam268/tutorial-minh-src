import { PostModel } from '../models/PostModel.js';
import { ObjectId } from 'mongodb';

export const getPosts = async (req, res) => {
  try {
    const { query } = req;
    console.log(query);
    const posts = await PostModel.find().populate('author');
    //console.log('posts', posts);
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).json({ error: err });   
  }
};

export const getPostsBySearch = async (req, res) => {
  try {
    console.log("xyz")
    let tag = req.query.s;
    console.log(tag)
    const postsFiltered = await PostModel.find({ title: tag}).populate('author');
    console.log(postsFiltered.length)
    res.status(200).json(postsFiltered);
  } catch(err) {
    res.status(500).json({ error: err });   
  }
};

export const createPost = async (req, res) => {
  
  try {
    const newPost = req.body;
    newPost.author = new ObjectId(newPost.author);
    const post = new PostModel(newPost);
    await post.save();
    const savedPost = await PostModel.findById(post._id).populate('author');
    res.status(200).json(savedPost); 
  } catch(err) {
    res.status(500).json({ error: err });   
  }
};

export const updatePost = async (req, res) => {
  try {
    const updatePost = req.body;
  
    const post = await PostModel.findOneAndUpdate(
      { _id: updatePost._id }, 
      updatePost, 
      { new: true }
    ).populate('author');
    
    res.status(200).json(post); 
  } catch(err) {
    res.status(500).json({ error: err });   
  }
};

export const deletePost = async (req, res) => {
  
  try {
    const deletePost = req.body;
    const post = await PostModel.findOneAndRemove(
      { _id: deletePost._id }
    );
    res.status(200).json(post); 
  } catch(err) {
    res.status(500).json({ error: err });   
  }
};

export const sortPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({
      title: -1
    }).populate('author');
    res.status(200).json(posts);
  } catch(err) {
    res.status(500).json({ error: err });   
  }
};



