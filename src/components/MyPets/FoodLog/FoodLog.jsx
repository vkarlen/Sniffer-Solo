import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from '@material-ui/core';
import { ThumbUpAlt, ThumbDownAlt, ThumbsUpDown } from '@material-ui/icons';

import './FoodLog.css';

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
          <TableCell>Rating</TableCell>
          <TableCell>Food</TableCell>
          <TableCell>Mark Current</TableCell>
          <TableCell>Delete</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {foodlog.map((food) => {
          return (
            <TableRow>
              <TableCell align="center">
                {food.rating === 'good' ? (
                  <ThumbUpAlt />
                ) : food.rating === 'bad' ? (
                  <ThumbDownAlt />
                ) : (
                  <ThumbsUpDown />
                )}
              </TableCell>

              <TableCell>
                {food.current && (
                  <span className="isCurrent">Current Food: </span>
                )}
                {food.name} {food.description}
              </TableCell>

              <TableCell>
                <button>✓</button>
              </TableCell>

              <TableCell>
                <button>X</button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default FoodLog;
