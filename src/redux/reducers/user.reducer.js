import { combineReducers } from 'redux';

const userInfo = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

const userPets = (state = [], action) => {
  switch (action.type) {
    case 'SET_PETS':
      return action.payload;
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default combineReducers({ userInfo, userPets });
