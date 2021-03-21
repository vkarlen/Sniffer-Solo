import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchUser() {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get('/api/user', config);
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_USER', payload: response.data });
    yield put({ type: 'FETCH_PETS' });
  } catch (error) {
    console.log('User get request failed', error);
  }
} // end fetchUser

function* fetchPets() {
  try {
    const pets = yield axios.get('/api/user/pets');

    yield put({ type: 'SET_PETS', payload: pets.data });
  } catch (error) {
    console.log('Error in fetchPets', error);
  }
} // end fetchPets

function* userSaga() {
  yield takeLatest('FETCH_USER', fetchUser);
  yield takeEvery('FETCH_PETS', fetchPets);
}

export default userSaga;
