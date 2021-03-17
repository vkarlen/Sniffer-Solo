import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PetDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const petInfo = useSelector((store) => store.pet.petDetail);

  useEffect(() => {
    dispatch({
      type: 'FETCH_EXACT_PET',
      payload: { id },
    });
  }, []);

  return (
    <div>
      <h2>{petInfo.name}</h2>
      <img src={petInfo.image_url} alt={petInfo.name} />
      <div>
        {/* Info will only render if it has been entered for this pet */}
        {petInfo.age && <p>Age: {petInfo.age}</p>}

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
