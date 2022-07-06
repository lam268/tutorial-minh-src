import { takeLatest, takeEvery , call, put } from 'redux-saga/effects';
import * as actions from '../actions';
import * as api from '../../api';

function* fetchPostsSaga(action) {
  try {
    const posts = yield call(api.fetchPosts);
    console.log('[posts]', posts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch(err) {
    console.error(err);
    yield put(actions.getPosts.getPostsFailure(err));  
  }
}

function* fetchPostsBySearchSaga(action) {
  try {
    const posts = yield call(api.fetchPostsBySearch, action.payload);
    yield put(actions.getPostsBySearch.getPostsBySearchSuccess(posts.data));
  } catch(err) {
    console.error(err);
    yield put(actions.getPostsBySearch.getPostsBySearchFailure(err));  
  }
}

function* createPostSaga(action) {
  try {
    //const post = yield call(api.createPost, action.payload);
    const post = yield call(api.createPost, {
      ...action.payload,
      author: window.localStorage.getItem('ID'),
    });
    console.log('[createPostSaga - post]', post);
    yield put(actions.createPost.createPostSuccess(post.data));
  } catch(err) {
    console.error(err);
    yield put(actions.createPost.createPostFailure(err));  
  }
}

function* updatePostSaga(action) {
  try {
    const updatedpost = yield call(api.updatePost, action.payload);
    console.log('[updatePostSaga - post]', updatedpost);
    yield put(actions.updatePost.updatePostSuccess(updatedpost.data));
  } catch(err) {
    console.error(err);
    yield put(actions.updatePost.updatePostFailure(err));  
  }
}

function* deletePostSaga(action) {
  try {
    const post = yield call(api.deletePost, action.payload);
    
    yield put(actions.deletePost.deletePostSuccess(post.data));
  } catch(err) {
    console.error(err);
    yield put(actions.deletePost.deletePostFailure(err));  
  }
}

function* sortPostsSaga(action) {
  try {
    const post = yield call(api.sortPosts, action.payload);
    
    yield put(actions.sortPosts.sortPostsSuccess(post.data));
  } catch(err) {
    console.error(err);
    yield put(actions.sortPosts.sortPostsFailure(err));  
  }
}

function* login(action) {
  try {
    const loginUser = yield call(api.login, action.payload);
    yield put(actions.login.loginSuccess(loginUser.data));
    window.localStorage.setItem('USER', loginUser?.data?.userName);
    window.localStorage.setItem('ID', loginUser?.data?._id);
  } catch (err) {
    console.error(err);
    yield put(actions.updatePost.updatePostFailure(err));
  }
}

function* register(action) {
  try {
    const registerUser = yield call(api.register, {
      userName: action.payload.userName,
      password: action.payload.password,
    });
    yield put(actions.register.registerSuccess(registerUser.data));
    window.localStorage.setItem('USER', registerUser?.data?.userName);
    window.localStorage.setItem('ID', registerUser?.data?._id);
  } catch (err) {
    console.error(err);
    yield put(actions.updatePost.updatePostFailure(err));
  }
}

function* logout(action) {
  try {    
    window.localStorage.clear();
    yield put(actions.logout.logoutSuccess());
  } catch (err) {
    console.error(err);
    yield put(actions.updatePost.updatePostFailure(err));
  }
}
 
function* mySaga() {
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeEvery(actions.getPostsBySearch.getPostsBySearchRequest, fetchPostsBySearchSaga);
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
  yield takeLatest(actions.deletePost.deletePostRequest, deletePostSaga);
  yield takeLatest(actions.sortPosts.sortPostsRequest, sortPostsSaga);
  yield takeLatest(actions.login.loginRequest, login);
  yield takeLatest(actions.register.registerRequest, register);
  yield takeLatest(actions.logout.logoutRequest, logout);
}

export default mySaga;