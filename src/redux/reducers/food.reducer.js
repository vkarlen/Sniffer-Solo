import { combineReducers } from 'redux';

const search = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload;
    case 'CLEAR_SEARCH':
      return [];
    default:
      return state;
  }
};

export default combineReducers({
  search,
});
