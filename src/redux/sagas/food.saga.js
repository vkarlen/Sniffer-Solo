import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSearch(action) {
  try {
    const results = yield axios.get(`/api/food/search`, {
      params: { allergies: action.payload },
    });

    yield put({
      type: 'SET_SEARCH',
      payload: results.data,
    });
  } catch (error) {
    console.log('Error in fetchSearch', error);
  }
} // end fetchSearch

function* fetchAllergies() {
  try {
    const allergies = yield axios.get(`/api/food/allergy`);

    yield put({
      type: 'SET_ALLERGIES',
      payload: allergies.data,
    });
  } catch (error) {
    console.log('Error in fetchAllergies', error);
  }
} // end fetchAllergies

function* foodSaga() {
  yield takeEvery('FETCH_SEARCH', fetchSearch);
  yield takeEvery('FETCH_ALLERGIES', fetchAllergies);
}

export default foodSaga;
