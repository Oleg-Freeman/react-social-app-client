import {
  SET_POSTS,
  LOADING_DATA,
  LIKE_POST,
  UNLIKE_POST,
  DELETE_POST,
  SET_ERRORS,
  ADD_POST,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_POST,
  STOP_LOADING_UI,
  ADD_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  UNLIKE_COMMENT
} from '../types';
import axios from 'axios';
const serverURL = process.env.REACT_APP_SERVER_URL;

// Get all posts
export const getPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${serverURL}/posts`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_POSTS,
        payload: []
      });
      console.log(err);
    });
};
// Get one post
export const getPost = (postId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`${serverURL}/posts/${postId}`)
    .then((res) => {
      dispatch({
        type: SET_POST,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
  // Add post
export const addPost = (newPost) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  const token = window.localStorage.getItem('token');
  axios({
    method: 'post',
    url: `${serverURL}/posts/add/`,
    data: newPost,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then((res) => {
      dispatch({
        type: ADD_POST,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
  // Like a post
export const likePost = (postId) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  axios({
    method: 'get',
    url: `${serverURL}/likes/add/${postId}`,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then((res) => {
      dispatch({
        type: LIKE_POST,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
  // Unlike a post
export const unlikePost = (postId) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  axios({
    method: 'delete',
    url: `${serverURL}/likes/${postId}`,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then((res) => {
      dispatch({
        type: UNLIKE_POST,
        payload: {
          postId: postId,
          unlikeId: res.data
        }
      });
    })
    .catch((err) => console.log(err));
};
  // Add comment
export const addComment = (postId, commentData) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  axios({
    method: 'post',
    url: `${serverURL}/comments/add/${postId}`,
    data: commentData,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then((res) => {
      dispatch({
        type: ADD_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Delete comment
export const deleteComment = (commentId, postId) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  axios({
    method: 'delete',
    url: `${serverURL}/comments/${commentId}`,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then(() => {
      dispatch({
        type: DELETE_COMMENT,
        payload: {
          postId: postId,
          commentId: commentId
        }
      });
    })
    .catch((err) => console.log(err));
};
  // Like comment
export const likeComment = (commentId) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  axios({
    method: 'get',
    url: `${serverURL}/likes/comments/add/${commentId}`,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then((res) => {
      dispatch({
        type: LIKE_COMMENT,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a post
export const unlikeComment = (commentId) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  axios({
    method: 'delete',
    url: `${serverURL}/likes/comments/${commentId}`,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then((res) => {
      dispatch({
        type: UNLIKE_COMMENT,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Delete post
export const deletePost = (postId) => (dispatch) => {
  const token = window.localStorage.getItem('token');
  axios({
    method: 'delete',
    url: `${serverURL}/posts/${postId}`,
    headers: { token: token.replace(/['"]+/g, '') }
  })
    .then(() => {
      dispatch({ type: DELETE_POST, payload: postId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userId) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`${serverURL}/users/${userId.replace(/['"]+/g, '')}`)
    .then((res) => {
      dispatch({
        type: SET_POSTS,
        payload: res.data.posts
      });
    })
    .catch(() => {
      dispatch({
        type: SET_POSTS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
