import { createActions, createAction } from 'redux-actions';

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,  
});

export const createPost = createActions({
    createPostRequest: (payload) => payload,
    createPostSuccess: (payload) => payload,
    createPostFailure: (err) => err,  
  });

export const updatePost = createActions({
  updatePostRequest: (payload) => payload,
  updatePostSuccess: (payload) => payload,
  updatePostFailure: (err) => err,  
});  

export const getPostsBySearch = createActions({
  getPostsBySearchRequest: (payload) => payload,
  getPostsBySearchSuccess: (payload) => payload,
  getPostsBySearchFailure: (err) => err,  
});

export const deletePost = createActions({
  deletePostRequest: (payload) => payload,
  deletePostSuccess: (payload) => payload,
  deletePostFailure: (err) => err,  
});

export const sortPosts = createActions({
  sortPostsRequest: (payload) => payload,
  sortPostsSuccess: (payload) => payload,
  sortPostsFailure: (err) => err,  
});

export const login = createActions({
  loginRequest: (payload) => payload,
  loginSuccess: (payload) => payload,
  loginFailure: (err) => err,
});

export const register = createActions({
  registerRequest: (payload) => payload,
  registerSuccess: (payload) => payload,
  registerFailure: (err) => err,
});

export const logout = createActions({
  logoutRequest: undefined,
  logoutSuccess: undefined,
})



export const showModal = createAction('SHOW_CREATE_POST_MODAL');
export const hideModal = createAction('HIDE_CREATE_POST_MODAL');