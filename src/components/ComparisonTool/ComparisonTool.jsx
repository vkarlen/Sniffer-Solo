import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import {
  Dialog,
  Grid,
  Paper,
  Container,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';

function ComparisonTool() {
  const dispatch = useDispatch();

  const compareList = useSelector((store) => store.food.compareList);

  const [foods, setFoods] = useState([]);

  useEffect(() => {
    dispatch({
      type: 'FETCH_COMPARELIST',
    });
  }, []);

  console.log(compareList);
  const addToCompare = (event) => {
    // Figures out which food was selected
    let selectedFood = compareList.find((obj) => obj.id == event.target.value);

    // Only adds selected food if it is not in the array already
    if (!foods.includes(selectedFood)) {
      console.log(event.target.value);
      setFoods([...foods, selectedFood]);
    }
  }; // end addToCompare

  const deleteFromCompare = (removedItem) => {
    // Removes clicked item from searchQuery
    setFoods(foods.filter((item) => item !== removedItem));
  }; // end deleteFromCompare

  return (
    <Container maxWidth="md">
      <h2>Comparison Tool</h2>

      <select value={foods} onChange={addToCompare}>
        <option hidden>ADD</option>
        {compareList.map((food) => {
          return (
            <option key={food.id} value={food.id}>
              {food.name} {food.description}
            </option>
          );
        })}
      </select>

      {/* {searchQuery.map((item) => {
        return (
          <span key={item}>
            <button onClick={() => deleteFromQuery(item)}>
              {
                allergySelect.find((allergy) => allergy.id === Number(item))
                  .description
              }
              &nbsp; X
            </button>
          </span>
        );
      })} */}
    </Container>
  );
}

export default ComparisonTool;
