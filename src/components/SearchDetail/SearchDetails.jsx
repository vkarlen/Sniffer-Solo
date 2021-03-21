import { DialogContent } from '@material-ui/core';

import './SearchDetails.css';

function SearchDetail({ food }) {
  console.log(food);
  return (
    <DialogContent id="detailContainer">
      <h3>
        {food.name} {food.description}
      </h3>
      <img src={food.image} alt={food.description} id="detailImage" />
      <p>Ingredients: {food.ingredientlist.join(', ')}</p>
    </DialogContent>
  );
}

export default SearchDetail;
