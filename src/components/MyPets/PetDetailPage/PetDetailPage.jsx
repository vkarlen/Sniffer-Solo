import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Container } from '@material-ui/core';

import './PetDetailPage.css';

import FoodLog from '../FoodLog/FoodLog';

function PetDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const petInfo = useSelector((store) => store.pet.petDetail);
  const user = useSelector((store) => store.user.userInfo);

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
    <Container maxWidth="md">
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <img
            src={petInfo.image_url}
            alt={petInfo.name}
            className="detailImage"
          />
        </Grid>
        <Grid item xs={7}>
          <h2>{petInfo.name}</h2>
          {/* Only render edit button for owner */}
          {user.id == petInfo.owner_id && (
            <button onClick={() => handleEdit(petInfo)}>+ edit</button>
          )}

          <Paper className="infoContainer">
            {/* Info will only render if it has been entered for this pet */}
            {petInfo.age && <p>Age: {petInfo.age} year(s)</p>}

            {petInfo.breed && <p>Breed: {petInfo.breed}</p>}

            {petInfo.allergies[0] && (
              <p>
                Allergies:&nbsp;
                {petInfo.allergies.join(', ')}
              </p>
            )}
          </Paper>
        </Grid>
      </Grid>

      <div>
        {/* Wait until pet info has loaded in to load foodlog */}
        {petInfo.id && <FoodLog pet={petInfo} user={user} />}
      </div>
    </Container>
  );
}

export default PetDetailPage;
