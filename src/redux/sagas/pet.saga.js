import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchExact(action) {
  try {
    const exactPet = yield axios.get(`/api/pet/details/${action.payload.id}`);

    yield put({
      type: 'SET_EXACT_PET',
      payload: exactPet.data,
    });
  } catch (error) {
    console.log('Error in fetchExact', error);
  }
} // end fetchExact

function* fetchLog(action) {
  try {
    const foodlog = yield axios.get(`/api/pet/log/${action.payload}`);

    yield put({
      type: 'SET_LOG',
      payload: foodlog.data,
    });
  } catch (error) {
    console.log('Error fetching log', error);
  }
} // end fetchLog

function* addPet(action) {
  try {
    yield axios.post('/api/pet/add', action.payload);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in addPet', error);
  }
} // end addPet

function* addToLog(action) {
  try {
    yield axios.post('/api/pet/log/add', action.payload);

    action.payload.onComplete();
  } catch (error) {
    console.log('Error adding to log', error);
  }
} // end addToLog

function* updatePet(action) {
  try {
    yield axios.put(`/api/pet/edit/${action.payload.id}`, action.payload);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in updatePet', error);
  }
} // end updatePet

function* updateCurrent(action) {
  try {
    yield axios.put(`/api/pet/log/setcurrent`, action.payload);

    yield put({
      type: 'FETCH_LOG',
      payload: action.payload.petID,
    });
  } catch (error) {
    console.log('Error in updateCurrent', error);
  }
} // end updateCurrent

function* updateRating(action) {
  try {
    yield axios.put(`/api/pet/log/rating`, action.payload);

    yield put({
      type: 'FETCH_LOG',
      payload: action.payload.petID,
    });
  } catch (error) {
    console.log('Error in updateRating', error);
  }
}

function* deletePet(action) {
  try {
    yield axios.delete(`/api/pet/delete/${action.payload}`);

    yield put({
      type: 'FETCH_PETS',
    });
  } catch (error) {
    console.log('Error in deletePet', error);
  }
} // end deletePet

function* deleteLog(action) {
  try {
    yield axios.delete(`/api/pet/log/delete/${action.payload.logID}`);

    yield put({
      type: 'FETCH_LOG',
      payload: action.payload.petID,
    });
  } catch (error) {
    console.log('Error in delete log', error);
  }
} // end deleteLog

function* petSaga() {
  yield takeEvery('FETCH_EXACT_PET', fetchExact);
  yield takeEvery('FETCH_LOG', fetchLog);
  yield takeEvery('ADD_PET', addPet);
  yield takeEvery('ADD_TO_LOG', addToLog);
  yield takeEvery('UPDATE_PET', updatePet);
  yield takeEvery('UPDATE_LOG_CURRENT', updateCurrent);
  yield takeEvery('UPDATE_LOG_RATING', updateRating);
  yield takeEvery('DELETE_PET', deletePet);
  yield takeEvery('DELETE_LOG', deleteLog);
}

export default petSaga;
