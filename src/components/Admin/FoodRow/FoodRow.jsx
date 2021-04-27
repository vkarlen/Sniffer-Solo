import { TableCell, TableRow } from '@material-ui/core/';

function FoodRow({ food }) {
  return (
    <TableRow>
      <TableCell>
        <img src={food.image} className="adminImage" />
      </TableCell>
      <TableCell>{food.brand}</TableCell>
      <TableCell>{food.description}</TableCell>
      <TableCell>{food.ingredients.join(', ')}</TableCell>
    </TableRow>
  );
}

export default FoodRow;
