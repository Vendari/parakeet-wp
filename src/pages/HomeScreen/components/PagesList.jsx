import React from 'react';
import { StyleSheet, ActivityIndicator, TouchableOpacity, Text, View } from 'react-native';
import { secondary, warning, white, third } from '../../../config/colors';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

export default function PagesList({hosts, onDelete, onSelect}) {
  if(hosts===undefined || hosts.length == 0) {
    return (
      <ActivityIndicator size="large" color={secondary} />
    );
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your collection:</Text>
      {hosts.map(item => 
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
            <Text style={styles.pageURL}>
              {item.url.toLowerCase()}
            </Text>
          </TouchableOpacity>
          <View style={styles.iconContainer}>
            {/* <TouchableOpacity>
                  <Ionicons name={'star'} style={[styles.icon, styles.star]} />
                </TouchableOpacity> */}
            <TouchableOpacity            
              onPress={() => onDelete(item.id)}
            >
              <Ionicons name={'trash'} style={[styles.icon, styles.delete]} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    paddingBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 15,
    width: '100%',
  },
  delete: {
    color: warning
  },
  icon: {
    fontSize: 24,
    padding: 10
  },
  iconContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 20
  },
  page: {
    alignItems: 'center',
    alignSelf: 'center',
    borderBottomColor: third,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
    padding: 20,
    width: '100%',
  },
  pageTitle: {
    fontSize: 24,
  },
  pageURL: {
    color: third,
    fontSize: 16
  },
  // star: {
  //   color: gold,
  //   fontSize: 32
  // },
  title: {
    color: secondary,
    fontSize: 32,
    fontWeight: 'bold' 
  }
});

PagesList.propTypes = {
  hosts: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
};
