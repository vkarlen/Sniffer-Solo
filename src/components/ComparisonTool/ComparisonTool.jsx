import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import {
  Container,
  Paper,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import './ComparisonTool.css';

function ComparisonTool() {
  const dispatch = useDispatch();

  const compareList = useSelector((store) => store.food.compareList);

  const [foods, setFoods] = useState([]);
  const [overlap, setOverlap] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPARELIST',
    });
  }, []);

  // Triggers any time foods changes
  useEffect(() => {
    if (foods.length == 2) {
      let result = foods[0].allergenlist.filter((x) =>
        foods[1].allergenlist.includes(x)
      );

      if (result.length < 1) {
        result = ['None'];
      }

      setOverlap(result);
    } else {
      setOverlap([]);
    }
  }, [foods]);

  const addToCompare = (event) => {
    // Figures out which food was selected by id
    let selectedFood = compareList.find((obj) => obj.id == event.target.value);

    // Only adds selected food if it is not in the array already
    if (!foods.includes(selectedFood) && foods.length < 2) {
      setFoods([...foods, selectedFood]);
    }
  }; // end addToCompare

  const deleteFromCompare = (removedID) => {
    // Removes clicked item from foods
    setFoods(foods.filter((item) => item.id !== removedID));
  }; // end deleteFromCompare

  return (
    <Container maxWidth="md">
      <h2 className="page-title">Comparison Tool</h2>

      <Paper id="compare-container">
        {foods.length < 2 && (
          <FormControl color="primary" color="primary">
            <FormHelperText>Select two foods</FormHelperText>

            <Select value={foods} onChange={addToCompare} id="compare-select">
              {compareList.map((food) => {
                return (
                  <MenuItem key={food.id} value={food.id}>
                    {food.name} {food.description}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        )}

        {overlap.length > 0 && (
          <div id="overlap-container">
            <p>Overlapping Ingredients:</p>
            <p id="overlap-text">{overlap.join(', ')}</p>
          </div>
        )}
      </Paper>

      <div>
        {foods.map((item) => {
          return (
            <Paper key={item.id} className="food-container">
              <IconButton
                onClick={() => deleteFromCompare(item.id)}
                className="close-btn"
              >
                <Close />
              </IconButton>
              <h3>
                {item.name} {item.description}
              </h3>
              <p>
                <b>Ingredients: </b>
                {item.ingredientlist.join(', ')}
              </p>
            </Paper>
          );
        })}
      </div>
    </Container>
  );
}

export default ComparisonTool;
