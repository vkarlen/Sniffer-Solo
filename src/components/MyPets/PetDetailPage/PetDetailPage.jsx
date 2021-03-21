import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function PetDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const petInfo = useSelector((store) => store.pet.petDetail);

  useEffect(() => {
    dispatch({
      type: 'FETCH_EXACT_PET',
      payload: { id },
    });
  }, []);

  const handleEdit = (petInfo) => {
    dispatch({
      type: 'SET_EDIT_PET',
      payload: petInfo,
    });

    history.push('/edit');
  }; // end handleEdit

  return (
    <div>
      <h2>{petInfo.name}</h2>
      <button onClick={() => handleEdit(petInfo)}>+ edit</button>

      <br />
      <img src={petInfo.image_url} alt={petInfo.name} />
      <div>
        {/* Info will only render if it has been entered for this pet */}
        {petInfo.age && <p>Age: {petInfo.age} year(s)</p>}

        {petInfo.breed && <p>Breed: {petInfo.breed}</p>}

        {petInfo.allergies[0] && (
          <p>
            Allergies:
            <ul>
              {petInfo.allergies.map((allergy, index) => {
                return <li key={index}>{allergy}</li>;
              })}
            </ul>
          </p>
        )}
      </div>
    </div>
  );
}

export default PetDetailPage;
