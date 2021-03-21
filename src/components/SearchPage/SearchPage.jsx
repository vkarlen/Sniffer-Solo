import { useParams } from 'react-router-dom';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './SearchPage.css';

// This has to exist out here or the search does not work
let searchQuery = [];

function SearchPage() {
  const dispatch = useDispatch();

  const searchResults = useSelector((store) => store.food.search);
  const allergies = useSelector((store) => store.food.allergy);

  useEffect(() => {
    searchQuery = [];
    dispatch({ type: 'CLEAR_SEARCH' });
    dispatch({ type: 'FETCH_ALLERGIES' });
  }, []);

  const addToQuery = (event) => {
    // Only adds allergy to list if it is not already in it
    if (!searchQuery.includes(event.target.value)) {
      searchQuery = [...searchQuery, event.target.value];
    }
    //console.log(searchQuery);

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

  return (
    <div>
      <h2>Search Tool</h2>
      <div>
        <select defaultValue="ADD" onChange={addToQuery}>
          <option hidden>ADD</option>
          {allergies.map((allergy) => {
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
              {
                allergies.find((allergy) => allergy.id === Number(item))
                  .description
              }
              <button onClick={() => deleteFromQuery(item)}>X</button>
            </span>
          );
        })}
      </div>

      <div>
        {searchResults !== 0 && (
          <>
            {searchResults.map((result) => {
              return (
                <div key={result.id} className="searchResultBox">
                  <img
                    src={result.image}
                    alt={result.description}
                    className="searchImg"
                  />
                  <p>
                    {result.brand} {result.description}
                  </p>
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
