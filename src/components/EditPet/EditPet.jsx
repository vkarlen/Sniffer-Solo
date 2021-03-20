import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function EditPet() {
  const dispatch = useDispatch();

  const pet = useSelector((store) => store.pet.editPet);
  const allergies = useSelector((store) => store.food.allergy);

  const [newName, setNewName] = useState(pet.name);
  const [newPicture, setNewPicture] = useState(pet.image_url);
  const [newAge, setNewAge] = useState(pet.age);
  const [newBreed, setNewBreed] = useState(pet.breed);
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

  return (
    <div>
      <h2>Edit {pet.name}</h2>
      <form>
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
