import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchExact(action) {
  try {
    const exactPet = yield axios.get(`/api/pet/${action.payload.id}`);

    yield put({
      type: 'SET_EXACT_PET',
      payload: exactPet.data,
    });
  } catch (error) {
    console.log('Error in fetchExact', error);
  }
}

function* petSaga() {
  yield takeEvery('FETCH_EXACT_PET', fetchExact);
}

export default petSaga;
