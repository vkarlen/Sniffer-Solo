import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

import { DialogContent, DialogActions } from '@material-ui/core';

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
        <h3>
          {food.name} {food.description}
        </h3>
        <img src={food.image} alt={food.description} id="detailImage" />
        <p>Ingredients: {food.ingredientlist.join(', ')}</p>
      </DialogContent>

      <DialogActions>
        <select
          defaultValue="SELECT"
          onChange={(evt) => {
            setPet(evt.target.value);
          }}
        >
          <option hidden>SELECT</option>

          {pets.map((pet) => {
            return (
              <option key={pet.id} value={pet.id}>
                {pet.name}
              </option>
            );
          })}
        </select>

        <button onClick={() => addToLog(food.id, true)}>Try Food</button>

        <button onClick={() => addToLog(food.id, false)}>Add to Log</button>
      </DialogActions>
    </div>
  );
}

export default SearchDetail;
