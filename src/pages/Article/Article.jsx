/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import makeWebshell, {
  HandleHTMLDimensionsFeature,
  ForceResponsiveViewportFeature,
  ForceElementSizeFeature,
  useAutoheight
} from '@formidable-webview/webshell';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import {style} from './wordpress.style.min.css.js';
import { ScrollView } from 'react-native-gesture-handler';

// lord please forgive me
const wordpressStyle = `
<head>
  <meta name="viewport" content="initial-scale=1, maximum-scale=1">
  <style>
    ${style}
  </style>
  <style>
  body {
    padding: 0%;
    margin: 0%;
    background-color: transparent;
  }
  img {
    width: 100%;
    height: auto;
  }
</style>
</head>
`;

const Webshell = makeWebshell(
  WebView,
  new HandleHTMLDimensionsFeature(),
  new ForceResponsiveViewportFeature({ maxScale: 1 }),
  new ForceElementSizeFeature({
    target: 'body',
    heightValue: 'auto'
  })
);

export default function Article(props){

  const articles = useSelector(state =>
    state.articles?.articles);
  const articleFromFound = useSelector(state =>
    state.articles?.article);

  const article = articles?.find((article =>article.id == props.match.params.id)) ||
  articleFromFound;

  const { autoheightWebshellProps } = useAutoheight({
    webshellProps: props
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.articleInformation}>
        <Text style={styles.articleTitle}>
          {article?.title?.rendered}
        </Text>
      </View>
      <View style={styles.webshell}>
      </View>
      <Webshell
        originWhitelist={['*']} 
        source={{ baseUrl: '', html:  `
        <!DOCTYPE html><html>${wordpressStyle}<body>${article?.content?.rendered || '<h1>Ładowanie...</h1>'}</body></html>`}}
        automaticallyAdjustContentInsets={false}
        scrollEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        useWebKit={true}
        {...autoheightWebshellProps}
      />
      <View style={styles.footer}/>
    </ScrollView>
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
  articleInformation: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25
  },
  articleTitle: {
    fontSize: 30,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 10,
    width:  '100%',
  },
  footer: {
    height: 200,
    width: 50
  },
  webshell: {
    width:  '100%',
  }
});

