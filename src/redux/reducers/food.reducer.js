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

const allergy = (state = [], action) => {
  switch (action.type) {
    case 'SET_ALLERGIES':
      return action.payload;
    default:
      return state;
  }
};

const tempQuery = (state = [], action) => {
  switch (action.type) {
    case 'SET_TEMP_QUERY':
      return action.payload;
    case 'CLEAR_TEMP_QUERY':
      return [];
    default:
      return state;
  }
};

const compareList = (state = [], action) => {
  switch (action.type) {
    case 'SET_COMPARELIST':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  search,
  allergy,
  tempQuery,
  compareList,
});
