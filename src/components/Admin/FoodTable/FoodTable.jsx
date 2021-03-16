import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import FoodRow from '../FoodRow/FoodRow';

import './FoodTable.css';

function FoodTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_FOOD' });
  }, []);

  const foodList = useSelector((store) => store.food.foodReducer);

  return (
    <div>
      <h3>All Foods in Database</h3>

      <table id="foodTable">
        <thead>
          <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>Ingredients</th>
          </tr>
        </thead>

        <tbody>
          {foodList.map((food) => {
            console.log(food);
            return <FoodRow food={food} key={food.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FoodTable;