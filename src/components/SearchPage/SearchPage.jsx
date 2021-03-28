import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Dialog,
  Grid,
  Paper,
  Container,
  Select,
  MenuItem,
  Button,
  FormHelperText,
  FormControl,
  Snackbar,
} from '@material-ui/core';

import './SearchPage.css';

import SearchDetail from '../SearchDetail/SearchDetails';

// This has to exist out here or the search does not work
let searchQuery = [];

function SearchPage() {
  const dispatch = useDispatch();

  const searchResults = useSelector((store) => store.food.search);
  const allergySelect = useSelector((store) => store.food.allergy);
  const tempQuery = useSelector((store) => store.food.tempQuery);

  const [openDetail, setOpenDetail] = useState(false);
  const [clickedFood, setClickedFood] = useState({});

  useEffect(() => {
    searchQuery = [];
    dispatch({ type: 'CLEAR_SEARCH' });
    dispatch({ type: 'FETCH_ALLERGIES' });

    //Check if there is a value in tempQuery from another page
    if (tempQuery.length > 0) {
      // get the ID for each item in tempQuery and add it to searchQuery
      tempQuery.forEach((allergy) => {
        searchQuery.push(
          allergySelect.find((obj) => obj.description === allergy).id
        );
      });

      dispatch({ type: 'FETCH_SEARCH', payload: searchQuery });
      dispatch({ type: 'CLEAR_TEMP_QUERY' });
    }
  }, []);

  const addToQuery = (event) => {
    // Only adds allergy to list if it is not already in it
    if (!searchQuery.includes(event.target.value)) {
      searchQuery = [...searchQuery, event.target.value];
    }

    dispatch({ type: 'FETCH_SEARCH', payload: searchQuery });
  }; // end addToQuery

  const deleteFromQuery = (removedItem) => {
    // Removes clicked item from searchQuery
    searchQuery = searchQuery.filter((item) => item !== removedItem);

    // Check if theres still items in query and dispatch according
    if (searchQuery.length > 0) {
      dispatch({ type: 'FETCH_SEARCH', payload: searchQuery });
    } else {
      dispatch({ type: 'CLEAR_SEARCH' });
    }
  }; // end deleteFromQuery

  const handleOpen = (food) => {
    setClickedFood(food);
    setOpenDetail(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpenDetail(false);
  }; // end handleClose

  return (
    <Container maxWidth="md">
      <h2 className="page-title">Search</h2>
      <p>Results will show all foods not containing the selected ingredients</p>

      <Paper id="search-container">
        <div>
          <FormControl color="primary">
            <FormHelperText id="allergy-label">
              Select Ingredients
            </FormHelperText>

            <Select
              labelId="allergy-label"
              onChange={addToQuery}
              id="query-select"
            >
              {allergySelect.map((allergy) => {
                return (
                  <MenuItem key={allergy.id} value={allergy.id}>
                    {allergy.description}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </div>
        <div>
          {searchQuery.map((item) => {
            return (
              <span key={item}>
                <Button onClick={() => deleteFromQuery(item)}>
                  X{' '}
                  {
                    allergySelect.find((allergy) => allergy.id === Number(item))
                      .description
                  }
                </Button>
              </span>
            );
          })}
        </div>
      </Paper>

      <Grid container spacing={2}>
        {searchResults !== 0 && (
          <>
            {searchResults.map((result) => {
              return (
                <Grid item xs={6} md={3} key={result.id}>
                  <Paper
                    className="searchResult"
                    onClick={() => handleOpen(result)}
                  >
                    <img
                      src={result.image}
                      alt={result.description}
                      className="searchImg"
                    />
                    <p>
                      {result.name} {result.description}
                    </p>
                  </Paper>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>

      <Dialog
        open={openDetail}
        onClose={handleClose}
        scroll="paper"
        id="detail-container"
      >
        <SearchDetail food={clickedFood} />
      </Dialog>
    </Container>
  );
}

export default SearchPage;
