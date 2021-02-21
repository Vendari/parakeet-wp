/* eslint-disable max-len */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {style} from './wordpress.style.min.css.js';


export default function Article(props){
  const backgroundColor = useSelector(state =>
    state.colors.backgroundColor);
  const textColor = useSelector(state =>
    state.colors.textColor);

  // lord please forgive me
  // what is this abomination
  const wordpressStyle = `
  <head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <style>
      ${style}
    </style>
    <style>
    body {
      padding: 0;
      margin: 0;
      width: 100%;
      background-color: ${backgroundColor};
      color: ${textColor};
    }
    img, figure, .wp-caption-text, .size-full {
      width: 100%;
      height: auto;
      text-align: center;
      margin: 0px;
      padding: 0px;
    }
    .wp-video, iframe, .wp-video-shortcode .mejs-video {
      width: 100%;
      height: auto;
      text-align: center;
      margin: 0px;
      padding: 0px;
    }
    a:link {
      text-decoration: none;
      color: ${textColor};
      font-weight: bold;
      text-decoration: underline;
    }
    a:visited {
        text-decoration: none;
        color: ${textColor};
        font-weight: bold;
        text-decoration: underline;
    }
  </style>
  </head>
  `;

  const articles = useSelector(state =>
    state.articles?.articles);
  const articleFromFound = useSelector(state =>
    state.articles?.article);

  const article = articles?.find((article =>article.id == props.match.params.id)) ||
  articleFromFound;

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <WebView
        originWhitelist={['*']} 
        source={{ baseUrl: '', html:  `<!DOCTYPE html><html>${wordpressStyle}<body><h1 class="post-title">${article?.title?.rendered}</h1>${article?.content?.rendered || '<h1>Loading...</h1>'}</body></html>`}}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        scalesPageToFit={false}
        bounces={false}
      />
    </View>
  );
}

Article.propTypes = {
  match: PropTypes.exact({
    params: PropTypes.exact({
      id: PropTypes.string.isRequired
    }),
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    isExact: PropTypes.bool.isRequired,
  }),   
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    padding: 10,
    width:  '100%',
  },
});

