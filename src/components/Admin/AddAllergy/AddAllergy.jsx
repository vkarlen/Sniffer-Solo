import { useDispatch } from 'react-redux';
import { useState } from 'react';

function AddAllergy() {
  const dispatch = useDispatch();

  const [newGroup, setNewGroup] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Make sure there is text in the input
    if (newGroup) {
      dispatch({
        type: 'ADD_GROUP',
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

      <form onSubmit={handleSubmit} className="adminForm">
        <label>
          Class Name:
          <input
            type="text"
            value={newGroup}
            onChange={(evt) => setNewGroup(evt.target.value)}
          />
        </label>

        <br />

        <button>Add</button>
      </form>
    </div>
  );
}

export default AddAllergy;
