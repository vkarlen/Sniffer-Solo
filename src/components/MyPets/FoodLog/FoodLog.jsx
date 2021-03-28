import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import {
  TableContainer,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  IconButton,
  Button,
  Card,
} from '@material-ui/core';
import {
  ThumbUpAlt,
  ThumbDownAlt,
  ThumbsUpDown,
  CheckBox,
  CheckBoxOutlineBlank,
  Delete,
} from '@material-ui/icons';

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
      {/* If the log is empty, render nothing */}
      {foodlog.length > 0 && (
        <>
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

          <TableContainer component={Card} id="log-table">
            <Table size="small">
              {edit && (
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Rating</TableCell>
                    <TableCell align="center">Food</TableCell>
                    <TableCell align="center">Current</TableCell>
                    <TableCell align="center">Delete</TableCell>
                  </TableRow>
                </TableHead>
              )}

              <TableBody>
                {foodlog.map((log) => {
                  return (
                    <TableRow key={log.id}>
                      <TableCell id="rating-col">
                        <IconButton
                          onClick={() => updateRating(log.foodid)}
                          aria-label="change rating"
                          size="small"
                        >
                          {log.rating === 'good' ? (
                            <ThumbUpAlt style={{ color: '#3e8635' }} />
                          ) : log.rating === 'bad' ? (
                            <ThumbDownAlt style={{ color: '#c53636' }} />
                          ) : (
                            <ThumbsUpDown color="disabled" />
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
                            <IconButton onClick={() => markCurrent(log.foodid)}>
                              {log.current ? (
                                <CheckBox />
                              ) : (
                                <CheckBoxOutlineBlank />
                              )}
                            </IconButton>
                          </TableCell>

                          <TableCell>
                            <IconButton onClick={() => deleteLog(log.id)}>
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  );
}

export default FoodLog;
