import { useParams } from 'react-router-dom';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function PetDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: 'FETCH_EXACT_PET',
      payload: { id },
    });
  }, []);

  return (
    <div>
      <h2>Dog Name</h2>
      <p>is a good pup</p>
    </div>
  );
}

export default PetDetailPage;
