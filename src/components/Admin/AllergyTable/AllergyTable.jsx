import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core/';

function AllergyTable() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'ADMIN_FETCH_ALLERGIES' });
    dispatch({ type: 'ADMIN_FETCH_INGREDIENTS' });
  }, []);

  const allergies = useSelector((store) => store.admin.allergy);
  const ingredients = useSelector((store) => store.admin.ingredient);

  const handleChange = (newType, ingredient) => {
    // Update allergy type when dropdown is changed
    dispatch({
      type: 'ADMIN_UPDATE_ALLERGY',
      payload: {
        newType,
        ingredient,
      },
    });
  }; // end handleChange

  return (
    <TableContainer style={{ maxWidth: 400, margin: 'auto' }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Ingredient</TableCell>
            <TableCell>Allergy Type</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {ingredients.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.ingredient}</TableCell>

                <TableCell>
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AllergyTable;
