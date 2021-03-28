import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Container, Button } from '@material-ui/core';

function AddPetPage() {
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
    if (newName) {
      dispatch({
        type: 'ADD_PET',
        payload: {
          name: newName,
          picture: newPicture,
          age: newAge,
          breed: newBreed,
          allergies: allergyList,
        },
      });

      // Clear inputs
      setNewName('');
      setNewPicture('');
      setNewAge('');
      setNewBreed('');
      setAllergyList([]);

      // Send user back to the pets page
      history.push('/pets');
    }
  };

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
    <Container maxWidth="md">
      <h2>Add a Pet</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pets Name"
          value={newName}
          onChange={(evt) => setNewName(evt.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Pets Picture"
          value={newPicture}
          onChange={(evt) => setNewPicture(evt.target.value)}
        />

        <input
          type="text"
          placeholder="Pets Age"
          value={newAge}
          onChange={(evt) => setNewAge(evt.target.value)}
        />

        <input
          type="text"
          placeholder="Pets Breed"
          value={newBreed}
          onChange={(evt) => setNewBreed(evt.target.value)}
        />

        <select defaultValue="ADD" onChange={addAllergy}>
          <option hidden>ADD</option>
          {allergies.map((allergy) => {
            return (
              <option key={allergy.id} value={allergy.description}>
                {allergy.description}
              </option>
            );
          })}
        </select>
        {allergyList.map((allergy, index) => {
          return (
            <span key={index}>
              <button onClick={() => deleteAllergy(allergy)}>
                {allergy} &nbsp; X
              </button>
            </span>
          );
        })}

        <button>Submit</button>
      </form>
    </Container>
  );
}

export default AddPetPage;
