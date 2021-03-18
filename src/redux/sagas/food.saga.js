import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchSearch(action) {
  try {
    const results = yield axios.get(`/api/food/search`);

    yield put({
      type: 'SET_SEARCH',
      payload: results.data,
    });
  } catch (error) {
    console.log('Error in fetchSearch', error);
  }
}

function* fetchAllergies() {
  try {
    const allergies = yield axios.get(`/api/food/search`);

    yield put({
      type: 'SET_SEARCH',
      payload: results.data,
    });
  } catch (error) {
    console.log('Error in fetchSearch', error);
  }
}

function* foodSaga() {
  yield takeEvery('FETCH_SEARCH', fetchSearch);
  yield takeEvery('FETCH_ALLERGY', fetchAllergies);
}

export default foodSaga;
