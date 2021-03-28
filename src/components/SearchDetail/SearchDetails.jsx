import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import {
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Button,
} from '@material-ui/core';

import './SearchDetails.css';

function SearchDetail({ food }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const pets = useSelector((store) => store.user.userPets);

  const [pet, setPet] = useState('');

  const addToLog = (foodID, current) => {
    dispatch({
      type: 'ADD_TO_LOG',
      payload: {
        pet,
        foodID,
        current,
      },
    });
    // Add success alert with option to go to pet page on click
  };
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
    </div>
  );
}

export default SearchDetail;
