import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { Paper, Button } from '@material-ui/core/';

function AddAllergy() {
  const dispatch = useDispatch();

  const [newGroup, setNewGroup] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Make sure there is text in the input
    if (newGroup) {
      dispatch({
        type: 'ADMIN_ADD_GROUP',
        payload: {
          description: newGroup,
        },
      });

      // Clear inputs
      setNewGroup('');
    }
  }; // end handleSubmit

  return (
    <div>
      <h3>Add New Allergy Classification</h3>

      <Paper style={{ width: 300, margin: '15px auto', padding: 15 }}>
        <form onSubmit={handleSubmit}>
          <label>
            Class Name:
            <input
              type="text"
              value={newGroup}
              onChange={(evt) => setNewGroup(evt.target.value)}
              required
            />
          </label>

          <br />

          <Button color="primary" variant="contained">
            Add
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default AddAllergy;
