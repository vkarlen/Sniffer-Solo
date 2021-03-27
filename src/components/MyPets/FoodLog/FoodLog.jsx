import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  IconButton,
  Button,
} from '@material-ui/core';
import { ThumbUpAlt, ThumbDownAlt, ThumbsUpDown } from '@material-ui/icons';

import './FoodLog.css';

function FoodLog({ pet, user }) {
  const dispatch = useDispatch();

  const foodlog = useSelector((store) => store.pet.foodlog);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'FETCH_LOG',
      payload: pet.id,
    });
  }, []);

  const deleteLog = (logID) => {
    if (user.id === pet.owner_id) {
      dispatch({
        type: 'DELETE_LOG',
        payload: { logID: logID, petID: pet.id },
      });
    }
  }; // end deleteLog

  const markCurrent = (foodID) => {
    if (user.id === pet.owner_id) {
      dispatch({
        type: 'UPDATE_LOG_CURRENT',
        payload: { foodID: foodID, petID: pet.id },
      });
    }
  }; // end markCurrent

  const updateRating = (foodID) => {
    if (user.id === pet.owner_id) {
      dispatch({
        type: 'UPDATE_LOG_RATING',
        payload: { foodID: foodID, petID: pet.id },
      });
    }
  };

  return (
    <div>
      <div className="log-header">
        <h3 className="log-title">Food Log</h3>
        {user.id === pet.owner_id && (
          <Button
            variant="text"
            color="primary"
            size="small"
            onClick={() => {
              setEdit(!edit);
            }}
          >
            + edit
          </Button>
        )}
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Rating</TableCell>
            <TableCell>Food</TableCell>
            {edit && (
              <>
                <TableCell>Mark Current</TableCell>
                <TableCell>Delete</TableCell>
              </>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {foodlog.map((log) => {
            return (
              <TableRow key={log.id}>
                <TableCell align="center">
                  <IconButton onClick={() => updateRating(log.foodid)}>
                    {log.rating === 'good' ? (
                      <ThumbUpAlt />
                    ) : log.rating === 'bad' ? (
                      <ThumbDownAlt />
                    ) : (
                      <ThumbsUpDown />
                    )}
                  </IconButton>
                </TableCell>

                <TableCell>
                  {log.current && (
                    <span className="isCurrent">Current Food: </span>
                  )}
                  {log.name} {log.description}
                </TableCell>

                {edit && (
                  <>
                    <TableCell>
                      <button onClick={() => markCurrent(log.foodid)}>✓</button>
                    </TableCell>

                    <TableCell>
                      <button onClick={() => deleteLog(log.id)}>X</button>
                    </TableCell>
                  </>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default FoodLog;
