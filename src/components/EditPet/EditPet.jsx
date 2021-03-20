import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditPet() {
  const dispatch = useDispatch();

  const pet = useSelector((store) => store.pet.editPet);
  const allergies = useSelector((store) => store.food.allergy);

  const [allergyList, setAllergyList] = useState(pet.allergies);

  useEffect(() => {
    dispatch({ type: 'FETCH_ALLERGIES' });
  }, []);

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
  }; // end handleSubmit

  return (
    <div>
      <h2>Edit</h2>
      <form onSubmit={handleSubmit}>
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

        <button>Update</button>
      </form>
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
            {allergy} <button onClick={() => deleteAllergy(allergy)}>X</button>
          </span>
        );
      })}
    </div>
  );
}

export default EditPet;
