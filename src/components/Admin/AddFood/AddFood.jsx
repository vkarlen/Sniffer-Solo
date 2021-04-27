import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { Paper, Button } from '@material-ui/core/';

import '../Admin.css';

function AddFood() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'ADMIN_FETCH_BRANDS' });
  }, []);

  const brandList = useSelector((store) => store.admin.brand);

  const [newBrand, setNewBrand] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newIngredients, setNewIngredients] = useState('');
  const [newImage, setNewImage] = useState('');

  const handleSubmit = (evt) => {
    evt.preventDefault();

    // Change ingredient list to array
    const ingredientsArray = newIngredients.split(', ');

    dispatch({
      type: 'ADMIN_ADD_FOOD',
      payload: {
        brand: newBrand,
        description: newDesc,
        ingredients: ingredientsArray,
        image: newImage,
      },
    });

    // Clear inputs
    setNewDesc('');
    setNewIngredients('');
    setNewImage('');
  }; // end handleSubmit

  return (
    <div>
      <h3>Add New Food</h3>

      <Paper style={{ width: 300, margin: '15px auto', padding: 15 }}>
        <form onSubmit={handleSubmit}>
          <label>
            Brand:
            <select onChange={(evt) => setNewBrand(evt.target.value)}>
              <option>SELECT</option>
              {brandList.map((brand) => {
                return (
                  <option value={brand.id} key={brand.id}>
                    {brand.name}
                  </option>
                );
              })}
            </select>
          </label>

          <br />

          <label>
            Description:
            <input
              type="text"
              value={newDesc}
              onChange={(evt) => setNewDesc(evt.target.value)}
            />
          </label>

          <br />

          <label>
            Ingredients:
            <input
              type="text"
              value={newIngredients}
              onChange={(evt) => setNewIngredients(evt.target.value)}
            />
          </label>

          <br />

          <label>
            Image:
            <input
              type="text"
              value={newImage}
              onChange={(evt) => setNewImage(evt.target.value)}
            />
          </label>

          <br />

          <Button color="primary" variant="contained">
            Submit
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default AddFood;
