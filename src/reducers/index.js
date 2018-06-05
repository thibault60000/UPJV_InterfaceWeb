import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import articleReducer from './article';
import commentaireReducer from './commentaire';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  articleState: articleReducer,
  commentaireState: commentaireReducer,
});

export default rootReducer;
