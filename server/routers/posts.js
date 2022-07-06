import express from 'express';
import { getPosts, createPost, updatePost, deletePost, getPostsBySearch, sortPosts } from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);

router.get('/search', getPostsBySearch);

router.post('/', createPost);

router.post('/update', updatePost);

router.post('/delete', deletePost);

router.get('/sort', sortPosts);

export default router;