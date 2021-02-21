import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, ActivityIndicator, SafeAreaView} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../actions/articles';
import { withRouter } from 'react-router-native';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';

import {secondary, third} from '../../config/colors';

function CategoriesList(props){

  const backgroundColor = useSelector(state =>
    state.colors.backgroundColor);
  const textColor = useSelector(state =>
    state.colors.textColor);
  

  const dispatch = useDispatch();

  useEffect(() => 
    dispatch(getCategories(props.category)), [getCategories]
  );

  const categories = useSelector(state => state.articles?.categories);

  if(!categories){
    return <ActivityIndicator size="large" color={secondary} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <FlatList 
        style={[{backgroundColor}]}
        data={categories}
        contentContainerStyle={styles.containerLayout}
        renderItem={
          ({item}) =>
            <TouchableOpacity style={styles.articleItem} key={item.id} onPress={() => {
              props.history.push(`articles-list/${item.id}`);
            }}>
              <Text style={[styles.categoryName, {color: textColor, borderColor: textColor}]}>{item.name}</Text>
            </TouchableOpacity>
        }
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  articleItem: {
    borderBottomWidth: 1,
    borderColor: third,
    margin: 20,
  },
  categoryName: {
    color: third,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1.4,
    paddingBottom: 10,
    textAlignVertical: 'center',
  },
  container: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 10,
    width: '100%'
  },
  containerLayout: {
    justifyContent: 'center'
  }
});

CategoriesList.propTypes = {
  category: PropTypes.number,
  history: PropTypes.object.isRequired
};

export default withRouter(CategoriesList);
