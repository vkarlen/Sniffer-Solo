import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dialog, Grid, Paper, Container } from '@material-ui/core';

import './SearchPage.css';

import SearchDetail from '../SearchDetail/SearchDetails';

// This has to exist out here or the search does not work
let searchQuery = [];

function SearchPage() {
  const dispatch = useDispatch();

  const searchResults = useSelector((store) => store.food.search);
  const allergySelect = useSelector((store) => store.food.allergy);
  const tempQuery = useSelector((store) => store.food.tempQuery);

  const [open, setOpen] = useState(false);
  const [clickedFood, setClickedFood] = useState({});

  useEffect(() => {
    searchQuery = [];
    dispatch({ type: 'CLEAR_SEARCH' });
    dispatch({ type: 'FETCH_ALLERGIES' });

    //Check if there is a value in tempQuery from another page
    if (tempQuery) {
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
    setOpen(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpen(false);
  }; // end handleClose

  return (
    <Container maxWidth="md">
      <h2>Search Tool</h2>
      <div>
        <select defaultValue="ADD" onChange={addToQuery}>
          <option hidden>ADD</option>
          {allergySelect.map((allergy) => {
            return (
              <option key={allergy.id} value={allergy.id}>
                {allergy.description}
              </option>
            );
          })}
        </select>

        {searchQuery.map((item) => {
          return (
            <span key={item}>
              <button onClick={() => deleteFromQuery(item)}>
                {
                  allergySelect.find((allergy) => allergy.id === Number(item))
                    .description
                }
                &nbsp; X
              </button>
            </span>
          );
        })}
      </div>

      <Grid container spacing={2}>
        {searchResults !== 0 && (
          <>
            {searchResults.map((result) => {
              return (
                <Grid item xs={6} md={3} key={result.id}>
                  <Paper className="searchResult">
                    <img
                      src={result.image}
                      alt={result.description}
                      className="searchImg"
                      onClick={() => handleOpen(result)}
                    />
                    <p>
                      {result.brand} {result.description}
                    </p>
                  </Paper>
                </Grid>
              );
            })}
          </>
        )}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <SearchDetail food={clickedFood} />
      </Dialog>
    </Container>
  );
}

export default SearchPage;
