// basicly advanced version of Articles list
import React, {Component} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { getArticles, getTags } from '../../actions/articles';
import { withRouter } from 'react-router-native';
import { connect } from 'react-redux';
import {compose} from 'redux';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';

import {primary, secondary, third} from '../../config/colors';

class ArticlesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      showFilters: false,
      page: 1,
      per_page: 5,
    };
  }

  componentDidMount() {
    this.props.getArticles(this.props.category, this.state.tags);
    this.props.getTags();
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.tags!==this.state.tags || prevState.page!==this.state.page )
      this.props.getArticles(this.props.category, this.state.tags.map(tag => tag.id),
        this.state.page, this.state.per_page);
  }

  render() {
    const {articles, all_tags, backgroundColor, textColor} = this.props;
    return (
      <ScrollView style={[styles.container, {backgroundColor}]}>
        <TouchableOpacity
          onPress={() => this.setState({showFilters: !this.state.showFilters})} style={styles.filterBtn}>
          <Ionicons color="black" size={25} name="options"/>
        </TouchableOpacity>
        {this.state.tags.length>0 && 
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.searchTagsScrollView}>
          <FlatList
            scrollEnabled={false}
            numColumns={Math.ceil(all_tags?.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={this.state.tags}
            renderItem={({item}) => <TouchableOpacity style={styles.actualSearchTagBtn}
              onPress={() => this.setState({tags: this.state.tags.filter(tag => tag.id!==item.id), page: 1})}>
              <Text style={styles.actualSearchTagBtnText}>{item.name}</Text>
              <Ionicons color="black" size={15} name="close"/>
            </TouchableOpacity>}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        }
        {(all_tags && this.state.showFilters) && 
        <ScrollView
          horizontal
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.searchTagsScrollView}>
          <FlatList
            scrollEnabled={false}
            numColumns={Math.ceil(all_tags?.length / 2)}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            data={all_tags}
            renderItem={({item}) => <TouchableOpacity style={styles.searchTagBtn}
              onPress={() => {
                this.setState({tags: this.state.tags.indexOf(item) === -1 ?
                  [...this.state.tags, item] :
                  this.state.tags});
              }}>
              <Text style={styles.searchTagBtnText}>{item.name}</Text>
            </TouchableOpacity>}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
        }
        {
          articles ?
            articles.map((article) => <TouchableOpacity style={styles.articleItem} key={article.id} onPress={() => {
              this.props.history.push(`/article/${article.id}`);
            }}>
              <View style={styles.article}>
                <Text style={[styles.articleTitle, {color: textColor}]}>{article.title.rendered}</Text>
                <Text style={[styles.date, {color: textColor}]}>{article.date.substring(0, 10)}</Text>
                <View style={styles.tags}>
                  {all_tags?.find((tag) => tag.id===article.tags[0])?.name &&
                  <Text style={[styles.tagText, {color: textColor}]}>
                     | {all_tags?.find((tag) =>tag.id===article.tags[0])?.name || ''}</Text>}
                  {all_tags?.find((tag) => tag.id===article.tags[1])?.name &&
                  <Text style={[styles.tagText, {color: textColor}]}>
                     | {all_tags?.find((tag) =>tag.id===article.tags[1])?.name || ''}</Text>}
                  {all_tags?.find((tag) => tag.id===article.tags[2])?.name &&
                  <Text style={[styles.tagText, {color: textColor}]}>
                     | {all_tags?.find((tag) =>tag.id===article.tags[2])?.name || ''}</Text>}
                </View>
              </View>
              {/* https://stackoverflow.com/questions/5002111/how-to-strip-html-tags-from-string-in-javascript */}
            </TouchableOpacity>) : 
            <View style={styles.articleItem}>
              <View style={styles.article}>
                <Text style={styles.articleTitle}>Loading</Text>
              </View>
            </View>}
        {articles?.length === 0 && 
            <View style={styles.articleItem}>
              <View style={styles.article}>
                <Text style={styles.articleTitle}>There are no articles in this category</Text>
              </View>
            </View>}
        <View style={styles.buttonContainer}>
          <TouchableOpacity disabled={this.state.page === 1} 
            style={[styles.button, styles.page_button]}
            onPress={() => this.setState({page: this.state.page-1 })}>
            <Ionicons color={primary} size={40} 
              name={this.state.page === 1 ? 'arrow-back-circle-outline' : 'arrow-back-circle'}/>
          </TouchableOpacity>
          <TouchableOpacity disabled={articles?.length<this.state.per_page} 
            style={[styles.button, styles.page_button]}
            onPress={() => this.setState({page: this.state.page+1})}>
            <Ionicons color={primary} size={40}
              name={articles?.length<this.state.per_page ? 'arrow-forward-circle-outline' : 'arrow-forward-circle'}/>
          </TouchableOpacity>
        </View>
      </ScrollView>);
  }
}

const styles = StyleSheet.create({
  actualSearchTagBtn: {
    backgroundColor: third,
    borderRadius: 25,
    flexDirection: 'row',
    margin: 5,
    padding: 15,
  },
  actualSearchTagBtnText: {
    color: secondary,
    fontSize: 15
  },
  article: {
    alignSelf: 'flex-start',
    borderBottomWidth: 1,
    borderColor: third,
    flex: 1,
    width: '99%',
  },
  articleItem: {
    borderRadius: 8,
    height: 'auto',
    justifyContent: 'space-between',
    margin: 5,
    padding: '8%',
  },
  articleTitle: {
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
  },
  container: {
    flex: 1,
    marginTop: 80,
    width: '100%'
  },
  date: {
    // color: highlightPhotoCaption,
    fontSize: 10
  },
  filterBtn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: primary,
    borderRadius: 25,
    margin: 20,
    padding: 10,
    width: '50%'
  },
  searchTagBtn: {
    backgroundColor: secondary,
    borderRadius: 25,
    margin: 5,
    padding: 15
  },
  searchTagBtnText: {
    color: primary,
    fontSize: 15
  },
  searchTagsScrollView: {
    borderRadius: 25,
    paddingVertical: 15
  },
  tagText: {
    color: secondary,
  },
  tags: {
    flexDirection: 'column',
    marginTop: 10,
  },
});
ArticlesList.propTypes = {
  category: PropTypes.number,
  history: PropTypes.object.isRequired,
  articles: PropTypes.array,
  articles_tags: PropTypes.array,
  all_tags: PropTypes.array,
  getArticles: PropTypes.func.isRequired,
  getTags: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  textColor: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  notification: state.notification,
  articles: state.articles.articles,
  articles_tags: state.articles.articles_tags,
  all_tags: state.articles.tags,
  backgroundColor: state.colors.backgroundColor,
  textColor: state.colors.textColor,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {getArticles, getTags})
)(ArticlesList);
