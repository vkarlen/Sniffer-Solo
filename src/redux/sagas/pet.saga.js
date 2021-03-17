import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchExact(action) {
  console.log('in fetchExact');
}

function* petSaga() {
  yield takeEvery('FETCH_EXACT_PET', fetchExact);
}

export default petSaga;
