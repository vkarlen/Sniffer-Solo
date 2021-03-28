import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import {
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import './SearchDetails.css';

function SearchDetail({ food }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const pets = useSelector((store) => store.user.userPets);

  const [pet, setPet] = useState('');
  const [openAlert, setOpenAlert] = useState(false);

  const addToLog = (foodID, current) => {
    dispatch({
      type: 'ADD_TO_LOG',
      payload: {
        pet,
        foodID,
        current,
        onComplete: () => setOpenAlert(true),
      },
    });

    //setOpenAlert(true);
  }; // end addToLog

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  }; // end handleClose

  const goToPet = () => {
    history.push(`/pets/${pet}`);
  }; // end goToPet

  return (
    <div id="detailContainer">
      <DialogContent>
        <h2>
          {food.name} {food.description}
        </h2>
        <img src={food.image} alt={food.description} id="detailImage" />
        <p>
          <b>Ingredients:</b> {food.ingredientlist.join(', ')}
        </p>
      </DialogContent>

      <DialogActions>
        <Select
          defaultValue="SELECT"
          label="Select a Pet"
          id="pet-select"
          onChange={(evt) => {
            setPet(evt.target.value);
          }}
        >
          {pets.map((pet) => {
            return (
              <MenuItem key={pet.id} value={pet.id}>
                {pet.name}
              </MenuItem>
            );
          })}
        </Select>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => addToLog(food.id, true)}
        >
          + Set Current
        </Button>

        <Button
          variant="outlined"
          color="primary"
          onClick={() => addToLog(food.id, false)}
        >
          + Add to Log
        </Button>
      </DialogActions>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert severity="success" variant="filled">
          Successfully added food
          <Button color="secondary" size="small" onClick={goToPet}>
            GO TO PET
          </Button>
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SearchDetail;
