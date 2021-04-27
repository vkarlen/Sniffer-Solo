import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import FoodRow from '../FoodRow/FoodRow';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core/';

function FoodTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'ADMIN_FETCH_FOOD' });
  }, []);

  const foodList = useSelector((store) => store.admin.food);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: 120 }}>Image</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Ingredients</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {foodList.map((food) => {
            return <FoodRow food={food} key={food.id} />;
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default FoodTable;
