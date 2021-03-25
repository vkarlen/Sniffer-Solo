import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

import { Container } from '@material-ui/core';

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

      {foods.map((item) => {
        return (
          <div key={item.id}>
            <p>
              {item.name} {item.description}
            </p>
            <p>Ingredients: {item.ingredientlist.join(', ')}</p>
            <button onClick={() => deleteFromCompare(item.id)}>X</button>
          </div>
        );
      })}

      <div>
        <h3>Overlap</h3>
        <p>{overlap && overlap.join(', ')}</p>
      </div>
    </Container>
  );
}

export default ComparisonTool;
