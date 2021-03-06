import {GET_ERRORS, GET_ARTICLES, GET_ARTICLE, GET_CATEGORIES, GET_TAGS, SEARCH_CONTENT} from './types';
import { setup } from 'axios-cache-adapter';

// Create `axios` instance with pre-configured `axios-cache-adapter` attached to it
const axios = setup({
  // `axios-cache-adapter` options
  cache: {
    maxAge: 15 * 60 * 1000
  }
});

const getHost = (state) => state.hosts?.actualHost?.url;

// parentId is for getting subcategories
export const getCategories = (parentId) => (dispatch, getState) => {
  axios.get(`${getHost(getState())}/wp-json/wp/v2/categories`,
    {
      params: {
        parent: parentId
      }
    })
    .then(res => dispatch({type: GET_CATEGORIES, payload: res.data}))
    .catch(err => {
      console.log({...err});
      dispatch({type: GET_ERRORS, payload: {articles: err?.response?.data,
        message: err?.response?.message}});});
};

export const getArticles = (category_id, tags, page = 1, per_page = 5) => (dispatch, getState) => {
  axios.get(`${getHost(getState())}/wp-json/wp/v2/posts`, {
    params: {
      categories: category_id,
      tags,
      page,
      per_page,
    }
  })
    .then(res => dispatch({type: GET_ARTICLES, payload: res.data}))
    .catch(err => dispatch({type: GET_ERRORS, payload: {articles: err?.response?.data,
      message: err?.response?.message}}));
};

export const getTags = () => (dispatch, getState) => {
  axios.get(`${getHost(getState())}/wp-json/wp/v2/tags`)
    .then(res => dispatch({type: GET_TAGS, payload: res.data}))
    .catch(err => dispatch({type: GET_ERRORS, payload: {articles: err?.response?.data,
      message: err?.response?.message}}));
};

export const getArticle = (id) => (dispatch, getState) => {
  axios.get(`${getHost(getState())}/wp-json/wp/v2/posts/${id}`)
    .then(res => dispatch({type: GET_ARTICLE, payload: res.data}))
    .catch(err => dispatch({type: GET_ERRORS, payload: {articles: err?.response?.data,
      message: err?.response?.message}}));
};

export const searchArticles = (search, type, page = 1, per_page = 5) => (dispatch, getState) => {
  axios.get(`${getHost(getState())}/wp-json/wp/v2/search`, {
    params: {
      search, type, page, per_page, subtype: 'post'
    }
  })
    .then(res => dispatch({type: SEARCH_CONTENT, payload: res.data}))
    .catch(err => dispatch({type: GET_ERRORS, payload: {articles: err?.response?.data,
      message: err?.response?.message}}));
};
