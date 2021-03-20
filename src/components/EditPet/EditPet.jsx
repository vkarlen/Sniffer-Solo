import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useHistory } from 'react-router-dom';

function EditPet() {
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

    history.push(`/pets/${pet.id}`);
  }; // end handleSubmit

  return (
    <div>
      <h2>Edit</h2>
      <form>
        <input
          type="text"
          placeholder="Pets Name"
          value={pet.name}
          onChange={(evt) => handleChange(evt.target.value, 'name')}
          required
        />

        <input
          type="text"
          placeholder="Pets Picture"
          value={pet.image_url}
          onChange={(evt) => handleChange(evt.target.value, 'image_url')}
        />

        <input
          type="text"
          placeholder="Pets Age"
          value={pet.age}
          onChange={(evt) => handleChange(evt.target.value, 'age')}
        />

        <input
          type="text"
          placeholder="Pets Breed"
          value={pet.breed}
          onChange={(evt) => handleChange(evt.target.value, 'breed')}
        />

        <select
          defaultValue="ADD"
          onChange={(evt) => addAllergy(evt.target.value)}
        >
          <option hidden>ADD</option>
          {allergies.map((allergy) => {
            return (
              <option key={allergy.id} value={allergy.description}>
                {allergy.description}
              </option>
            );
          })}
        </select>

        {/* Only renders if pet had allergies */}
        {pet.allergies.map((allergy, index) => {
          return (
            <span key={index}>
              {allergy}
              <button onClick={() => deleteAllergy(allergy)}>X</button>
            </span>
          );
        })}

        <button onClick={handleSubmit}>Update</button>
      </form>
    </div>
  );
}

export default EditPet;
