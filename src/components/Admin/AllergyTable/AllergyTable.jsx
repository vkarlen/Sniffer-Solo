import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

function AllergyTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_ALLERGIES' });
    dispatch({ type: 'FETCH_INGREDIENTS' });
  }, []);

  const allergies = useSelector((store) => store.food.allergyReducer);
  const ingredients = useSelector((store) => store.food.ingredientReducer);

  const handleChange = (newGroup, ingredient) => {
    //console.log('in Change', newGroup, ingredient);

    dispatch({
      type: 'UPDATE_ALLERGY',
      payload: {
        newGroup,
        ingredient,
      },
    });
  }; // end handleChange

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ingredient</th>
            <th>Allergy Class</th>
          </tr>
        </thead>

        <tbody>
          {ingredients.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.ingredient}</td>

                <td>
                  <select
                    defaultValue={item.all_id}
                    onChange={(evt) => handleChange(evt.target.value, item.id)}
                  >
                    {allergies.map((allergy) => {
                      return (
                        <option key={allergy.id} value={allergy.id}>
                          {allergy.description}
                        </option>
                      );
                    })}
                  </select>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default AllergyTable;
