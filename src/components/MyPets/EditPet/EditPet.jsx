import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

import {
  Grid,
  TextField,
  Select,
  FormControl,
  MenuItem,
  FormHelperText,
  Button,
} from '@material-ui/core';

import './EditPet.css';

function EditPet({ handleClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const pet = useSelector((store) => store.pet.editPet);
  const allergies = useSelector((store) => store.food.allergy);

  useEffect(() => {
    // If someone navigates here not from a pet's page, send them to pets
    if (!pet.id) {
      history.push('/pets');
    }

    dispatch({ type: 'FETCH_ALLERGIES' });
  }, []);

  const addAllergy = (value) => {
    // Only adds allergy to list if it is not already in it
    if (!pet.allergies.includes(value)) {
      dispatch({
        type: 'EDIT_ONCHANGE',
        payload: { property: 'allergies', value: [...pet.allergies, value] },
      });
    }
  }; // end addAllergy

  const deleteAllergy = (allergy) => {
    // Filters clicked allergy out of pet's allergies
    let newAllergyList = pet.allergies.filter((item) => item !== allergy);

    // Sets allergies to newAllergyList in store
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: 'allergies', value: newAllergyList },
    });
  }; // end deleteAllergy

  const handleChange = (value, prop) => {
    // Every change is stored in the redux store
    dispatch({
      type: 'EDIT_ONCHANGE',
      payload: { property: prop, value: value },
    });
  }; // end handleChange

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch({
      type: 'UPDATE_PET',
      payload: pet,
    });

    handleClose(false);
  }; // end handleSubmit

  const handleDelete = () => {
    dispatch({
      type: 'DELETE_PET',
      payload: pet.id,
    });

    dispatch({
      type: 'CLEAR_EDIT_PET',
    });

    history.push('/pets');
  };

  return (
    <div id="edit-container">
      <h2 className="page-title">Edit</h2>
      <Button
        variant="text"
        style={{ color: '#c53636' }}
        size="small"
        onClick={handleDelete}
      >
        x delete
      </Button>
      <div>
        <FormControl color="primary">
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                label="Name"
                fullWidth="true"
                value={pet.name}
                onChange={(evt) => handleChange(evt.target.value, 'name')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Picture"
                fullWidth="true"
                value={pet.image_url}
                onChange={(evt) => handleChange(evt.target.value, 'image_url')}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                label="Age in Years"
                fullWidth="true"
                value={pet.age}
                onChange={(evt) => handleChange(evt.target.value, 'age')}
              />
            </Grid>

            <Grid item xs={5}>
              <TextField
                label="Breed"
                fullWidth="true"
                value={pet.breed}
                onChange={(evt) => handleChange(evt.target.value, 'breed')}
              />
            </Grid>

            <Grid item xs={8}>
              <Select
                fullWidth="true"
                onChange={(evt) => addAllergy(evt.target.value)}
              >
                {allergies.map((allergy) => {
                  return (
                    <MenuItem key={allergy.id} value={allergy.description}>
                      {allergy.description}
                    </MenuItem>
                  );
                })}
              </Select>

              <FormHelperText>
                Select all known food sensitivities
              </FormHelperText>
            </Grid>

            <Grid item xs={12}>
              {/* Only renders if pet had allergies */}
              {pet.allergies.map((allergy, index) => {
                return (
                  <span key={index}>
                    <Button onClick={() => deleteAllergy(allergy)}>
                      X {allergy}
                    </Button>
                  </span>
                );
              })}
            </Grid>

            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                id="update-btn"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </FormControl>
      </div>
    </div>
  );
}

export default EditPet;
