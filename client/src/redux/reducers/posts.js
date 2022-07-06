import { INIT_STATE } from "../../constant";
import { getPosts, getType, createPost, updatePost, deletePost, getPostsBySearch, sortPosts } from "../actions";

export default function postReducers(state = INIT_STATE.posts, action, posts = []){
  switch(action.type) {
    case getType(getPosts.getPostsRequest):
      return {
        ...state, 
        isLoading: true,  
      };
    case getType(getPosts.getPostsSuccess):
      return {
        ...state, 
        isLoading: false,
        data: action.payload,
      };
    case getType(getPosts.getPostsFailure):
      return {
        ...state, 
        isLoading: false,  
      };
    case getType(getPostsBySearch.getPostsBySearchRequest):
      return {
        ...state, 
        isLoading: true,  
      };
    case getType(getPostsBySearch.getPostsBySearchSuccess):
      return {
        ...state, 
        isLoading: false,
        data: action.payload,
      };
    case getType(getPostsBySearch.getPostsBySearchFailure):
      return {
        ...state, 
        isLoading: false,  
      };
    case getType(createPost.createPostSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case getType(updatePost.updatePostSuccess):
      return {
        ...state,
        data: state.data.map(post => post._id === action.payload._id ? action.payload : post),
      };
    case getType(deletePost.deletePostSuccess):
      return {
        ...state,
        data: state.data.filter(post => post._id !== action.payload._id),  
      }; 
    case getType(sortPosts.sortPostsSuccess):
      return {
        ...state,
        data: [...state.data, action.payload],  
      };

    default:
      return state;  
  }
}