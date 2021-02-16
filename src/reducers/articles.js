import {GET_ARTICLES, GET_ARTICLE, GET_CATEGORIES, GET_TAGS, SEARCH_CONTENT} from '../actions/types';

const initialState = {
};

export default function (state = initialState, action) {
  switch (action.type) {
  case GET_CATEGORIES:
    return {categories: action.payload.map(category => ({id: category.id, name: category.name}))};
  case GET_ARTICLE:
    return {...state, article: action.payload};
  case GET_ARTICLES:
    return {...state,
      articles: action.payload || [],
      articles_tags: getUniqueTags(action.payload)
      ,
    };
  case GET_TAGS:
    return {...state,
      tags: action.payload.map(tag => ({name: tag.name, id: tag.id}))
    };
  case SEARCH_CONTENT:
    return {...state,
      foundContent: action.payload || []
    };
  default:
    return state;
  }
}

function getUniqueTags(articles) {
  if(!articles) return [];
  let all_tags = [];
  for(const article of articles) {
    try{
      all_tags.push(...article.tags);
    }
    catch(err) { // in case someone forget to put tags
      continue;
    }
  }
  const unique_tags = all_tags.filter((val, i, self) => self.indexOf(val) == i);
  return unique_tags;
}
