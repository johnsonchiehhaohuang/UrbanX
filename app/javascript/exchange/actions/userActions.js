import {
  FETCH_USER,
  SIGN_UP_USER,
  SIGN_IN_USER,
  SIGN_OUT_USER,
  NEW_PROFILE,
  FETCH_USER_REVIEWS,
  NEW_USER_REVIEW
} from './types';

import { displayFlash } from './flashActions';

import axios from 'axios';

import { setIsLoadingHeaderProfileContent } from './loadingActions';

export const fetchUser = () => dispatch => {
  axios.get('/is_signed_in')
  .then(function(response){
    dispatch({
      type: FETCH_USER,
      is_signed_in: response.data.is_signed_in,
      user_info: response.data.user_info
    })

    dispatch(setIsLoadingHeaderProfileContent(false));
  })
  .catch(function(error){
    console.log(error);
  })
}

export const signUpUser = (userData) => dispatch => {
  getCSRFToken();
  axios.post('/users.json',
  {
    user: userData
  })
  .then(function(response){
    dispatch({
      type: SIGN_UP_USER
    })
  })
  .catch(function(error){
    console.log(error)
  })
}

export const signInUser = (userData) => dispatch => {
  getCSRFToken();
  axios.post('/users/sign_in.json',
  {
    user: userData
  })
  .then(function(response){
    dispatch(fetchUser());
    dispatch(displayFlash('Signed in successfully.', true, 'positive'));
  })
  .catch(function(error){
    console.log(error);
    dispatch(displayFlash('Sign in failed.', true, 'negative'));
  })
}

export const newProfile = (profile) => dispatch => {
  getCSRFToken();
  axios.post('/user_profiles',
  {
    user_profile: profile
  })
  .then(function(response){
    dispatch(fetchUser());
  })
  .catch(function(error){
    console.log(error)
  })
}

export const signOutUser = () => dispatch => {
  getCSRFToken();
  axios.delete('/users/sign_out.json', {})
  .then(function(response){
    dispatch({
      type: SIGN_OUT_USER
    })
  })
  .catch(function(error){
    console.log(error)
  })
}

export const sendForgotPasswordEmail = (userData) => dispatch => {
  getCSRFToken();
  axios.post('/users/password',
  {
    user: userData
  })
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.log(error);
  })
}

// /user_profiles/:user_profile_id/user_reviews(.:format)

export const getUserReviews = (reviewee_id = reviewee_id) => dispatch => {
  console.log(reviewee_id);
  axios.get('/user_profiles/' + reviewee_id + '/user_reviews')
  .then(function(response){
    console.log("#######")
    console.log(response)
    dispatch({
      type: FETCH_USER_REVIEWS,
      user_reviews: response.data.user_reviews
    })
    console.log(user_reviews)
  })
  .catch(function(error){
    console.log(error);
  })
}

// /user_profiles/:user_profile_id/user_reviews/new(.:format) 
export const newUserReview = (user_review, reviewee_id, reviewer_id) => dispatch => {
  getCSRFToken();
  axios.post('/user_profiles/' + reviewee_id + '/user_reviews/',
  {
    reviewee_id: reviewee_id,
    reviewer_id: reviewer_id,
    user_review: user_review
  })
  .then(function(response){
    dispatch(
      getUserReviews(reviewee_id)
    )
  })
  .catch(function(error){
    console.log(error)
  })
}

export const editUserReview = (user_review, reviewee_id) => dispatch => {
  getCSRFToken();
  axios.patch('/user_profiles/' + reviewee_id + '/user_reviews/' + user_review.review_id,
  {
    user_review: user_review
  })
  .then(function(response){
    dispatch(
      getUserReviews(reviewee_id)
    )
  })
  .catch(function(error){
    console.log(error)
  })
}

export const deleteUserReview = (reviewee_id, review_id) => dispatch => {
  getCSRFToken();
  axios.delete('/user_profiles/' + reviewee_id + '/user_reviews/' + review_id,
  {
    reviewee_id: reviewee_id,
    review_id: review_id
  })
  .then(function(response){
    dispatch(
      getUserReviews(reviewee_id)
    )
  })
  .catch(function(error){
    console.log(error)
  })
}


const getCSRFToken = () => {
  const tokenDom = document.querySelector("meta[name=csrf-token]")
  if (tokenDom) {
     const csrfToken = tokenDom.content
     axios.defaults.headers.common['X-CSRF-Token'] = csrfToken
  }
}