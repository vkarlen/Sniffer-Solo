import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function SearchPage() {
  const dispatch = useDispatch();

  const searchResults = useSelector((store) => store.food.search);
  const allergies = useSelector((store) => store.food.allergy);

  let searchQuery = [];

  useEffect(() => {
    dispatch({ type: 'FETCH_ALLERGIES' });
  }, []);

  function addToQuery(event) {
    console.log('in add', event.target.value);

    searchQuery.push(event.target.value);

    dispatch({ type: 'FETCH_SEARCH', payload: searchQuery });
  }

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
      </div>

      <div>
        {searchResults !== 0 && (
          <>
            {searchResults.map((result) => {
              return (
                <div key={result.id}>
                  <img src={result.image} alt={result.description} />
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
