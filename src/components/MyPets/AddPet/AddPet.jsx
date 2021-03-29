import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  Grid,
  TextField,
  Select,
  FormControl,
  MenuItem,
  Button,
} from '@material-ui/core';

import './AddPet.css';

function AddPetPage({ handleClose }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const allergies = useSelector((store) => store.food.allergy);

  const [newName, setNewName] = useState('');
  const [newPicture, setNewPicture] = useState('');
  const [newAge, setNewAge] = useState('');
  const [newBreed, setNewBreed] = useState('');
  const [allergyList, setAllergyList] = useState([]);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALLERGIES' });
  }, []);

  const handleSubmit = () => {
    // Make sure a name is entered before sending data
    if (newName && newPicture) {
      let newPet = {
        name: newName,
        picture: newPicture,
        age: newAge,
        breed: newBreed,
        allergies: allergyList,
      };

      Object.keys(newPet).forEach(function (key) {
        if (newPet[key] === '') {
          newPet[key] = null;
        }
      });

      dispatch({
        type: 'ADD_PET',
        payload: newPet,
      });

      // Clear inputs
      setNewName('');
      setNewPicture('');
      setNewAge('');
      setNewBreed('');
      setAllergyList([]);

      // Close window
      handleClose(false);
    }
  }; // end handleSubmit

  const addAllergy = (event) => {
    // Only adds allergy to list if it is not already in it
    if (!allergyList.includes(event.target.value)) {
      setAllergyList([...allergyList, event.target.value]);
    }
  }; // end addAllergy

  const deleteAllergy = (allergy) => {
    // Removes clicked allergy from allergyList
    setAllergyList(allergyList.filter((item) => item !== allergy));
  }; // end deleteAllergy

  return (
    <div id="add-container">
      <h2 className="page-title">Add a Pet</h2>
      <FormControl color="primary">
        <Grid container spacing={2}>
          <Grid item xs={10}>
            <TextField
              label="Name"
              fullWidth="true"
              value={newName}
              onChange={(evt) => setNewName(evt.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Picture"
              fullWidth="true"
              value={newPicture}
              onChange={(evt) => setNewPicture(evt.target.value)}
              required
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="Age in Years"
              fullWidth="true"
              value={newAge}
              onChange={(evt) => setNewAge(evt.target.value)}
            />
          </Grid>

          <Grid item xs={5}>
            <TextField
              label="Breed"
              fullWidth="true"
              value={newBreed}
              onChange={(evt) => setNewBreed(evt.target.value)}
            />
          </Grid>

          <Grid item xs={8}>
            <Select fullWidth="true" onChange={addAllergy} label="Breed">
              {allergies.map((allergy) => {
                return (
                  <MenuItem key={allergy.id} value={allergy.description}>
                    {allergy.description}
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>

          <Grid item xs={12}>
            {allergyList.map((allergy, index) => {
              return (
                <span key={index}>
                  <Button onClick={() => deleteAllergy(allergy)}>
                    X {allergy}
                  </Button>
                </span>
              );
            })}
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="outlined"
              color="primary"
              id="submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </div>
  );
}

export default AddPetPage;
