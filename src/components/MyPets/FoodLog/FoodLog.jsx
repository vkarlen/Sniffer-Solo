import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core';

function FoodLog({ petID }) {
  const dispatch = useDispatch();

  const foodlog = useSelector((store) => store.pet.foodlog);

  useEffect(() => {
    dispatch({
      type: 'FETCH_LOG',
      payload: petID,
    });
  }, []);

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Current</TableCell>
          <TableCell>Food</TableCell>
          <TableCell>Rating</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {foodlog.map((food) => {
          return (
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                {food.name} {food.description}
              </TableCell>
              <TableCell>{food.rating}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default FoodLog;
