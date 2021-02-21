import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions/articles';
import { withRouter } from 'react-router-native';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';

import {secondary} from '../../config/colors';


function CategoriesList(props){

  const dispatch = useDispatch();

  useEffect(() => 
    dispatch(getCategories(props.category)), [getCategories]
  );

  const categories = useSelector(state => state.articles?.categories);

  if(!categories){
    return <ActivityIndicator size="large" color={secondary} />;
  }
  return (
    <FlatList 
      style={styles.container}
      data={categories}
      renderItem={
        ({item}) =>
          <TouchableOpacity style={styles.articleItem} key={item.id} onPress={() => {
            props.history.push(`articles-list/${item.id}`);
          }}>
            <Text style={styles.categoryName}>{item.name}</Text>
          </TouchableOpacity>
      }
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  articleItem: {
    margin: 15,
  },
  categoryName: {
    fontSize: 20,
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    marginTop: 100
  }
});

CategoriesList.propTypes = {
  category: PropTypes.number,
  history: PropTypes.object.isRequired
};

export default withRouter(CategoriesList);
