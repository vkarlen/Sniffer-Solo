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

  const deleteLog = (logID) => {
    dispatch({
      type: 'DELETE_LOG',
      payload: { logID, petID },
    });
  }; // end deleteLog

  const markCurrent = (foodID) => {
    dispatch({
      type: 'UPDATE_LOG_CURRENT',
      payload: { foodID, petID },
    });
  }; // end markCurrent

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
        {foodlog.map((log) => {
          return (
            <TableRow key={log.id}>
              <TableCell align="center">
                {log.rating === 'good' ? (
                  <ThumbUpAlt />
                ) : log.rating === 'bad' ? (
                  <ThumbDownAlt />
                ) : (
                  <ThumbsUpDown />
                )}
              </TableCell>

              <TableCell>
                {log.current && (
                  <span className="isCurrent">Current Food: </span>
                )}
                {log.name} {log.description}
              </TableCell>

              <TableCell>
                <button onClick={() => markCurrent(log.foodid)}>✓</button>
              </TableCell>

              <TableCell>
                <button onClick={() => deleteLog(log.id)}>X</button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

export default FoodLog;
