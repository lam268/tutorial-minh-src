import axios from 'axios';
 
const URL = 'http://localhost:3001';

export const fetchPosts = () => axios.get(`${URL}/posts`);
export const createPost = (payload) => axios.post(`${URL}/posts`, payload);
export const updatePost = (payload) => axios.post(`${URL}/posts/update`, payload);
export const deletePost = (payload) => axios.post(`${URL}/posts/delete`, payload);
export const fetchPostsBySearch = (payload) => axios.get(`${URL}/posts/search`, {params:{s:payload}});
export const sortPosts = (payload) => axios.get(`${URL}/posts/sort`, payload);

export const login = (payload) => axios.post(`${URL}/login`, payload);
export const register = (payload) => axios.post(`${URL}/register`, payload);
export const logout = (payload) => axios.post(`${URL}/logout`, payload);
//test