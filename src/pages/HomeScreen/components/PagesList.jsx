import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View } from 'react-native';
import { secondary, warning, primary } from '../../../config/colors';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native-gesture-handler';

export default function PagesList({hosts, onDelete, onSelect}) {
  if(hosts===undefined) {
    return (
      <ActivityIndicator size="large" color={secondary} />
    );
  }
  return (
    <FlatList 
      style={styles.container}
      data={hosts}
      renderItem={
        ({item}) =>
          <View
            key={item.id}
            style={styles.page}
          >
            <TouchableOpacity            
              onPress={() => onSelect(item.id)}
            >
              <Text style={styles.pageTitle}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity            
              onPress={() => onDelete(item.id)}
            >
              <Text style={styles.deleteButton}>
          Delete
              </Text>
            </TouchableOpacity>
          </View>
      }
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  },
  deleteButton: {
    backgroundColor: warning,
    padding: 10
  },
  page: {
    backgroundColor: secondary,
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    margin: 5,
    padding: 20
  },
  pageTitle: {
    backgroundColor: primary,
    fontSize: 20,
    padding: 10
  }
});

PagesList.propTypes = {
  hosts: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};
