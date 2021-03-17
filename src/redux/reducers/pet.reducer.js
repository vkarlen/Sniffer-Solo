import { combineReducers } from 'redux';

const petDetail = (state = {}, action) => {
  switch (action.type) {
    case 'SET_EXACT_PET':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  petDetail,
});
