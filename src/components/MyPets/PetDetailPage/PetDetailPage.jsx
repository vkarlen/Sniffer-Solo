import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Container, Button } from '@material-ui/core';

import './PetDetailPage.css';

import FoodLog from '../FoodLog/FoodLog';

function PetDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const petInfo = useSelector((store) => store.pet.petDetail);
  const user = useSelector((store) => store.user.userInfo);

  useEffect(() => {
    // Clear previous pet info
    dispatch({
      type: 'CLEAR_PET',
    });

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

  const findFood = () => {
    dispatch({
      type: 'SET_TEMP_QUERY',
      payload: petInfo.allergies,
    });

    history.push(`/search/`);
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} justify="center">
        <Grid item xs={5}>
          <img
            src={petInfo.image_url}
            alt={petInfo.name}
            className="detailImage"
          />
        </Grid>
        <Grid item xs={5}>
          <h2 className="page-title">{petInfo.name}</h2>

          {/* Only render edit button for owner */}
          {user.id == petInfo.owner_id && (
            <Button
              variant="text"
              color="primary"
              size="small"
              onClick={() => handleEdit(petInfo)}
            >
              + edit
            </Button>
          )}

          <Paper className="infoContainer">
            {/* Info will only render if it has been entered for this pet */}
            {petInfo.age && (
              <p>
                <span className="infoTitle">Age:</span> {petInfo.age} year(s)
              </p>
            )}

            {petInfo.breed && (
              <p>
                <span className="infoTitle">Breed:</span> {petInfo.breed}
              </p>
            )}

            {petInfo.allergies[0] && (
              <p>
                <span className="infoTitle">Allergies:</span>&nbsp;
                {petInfo.allergies.join(', ')}
              </p>
            )}
          </Paper>

          <Button
            variant="outlined"
            color="primary"
            id="sniff-btn"
            onClick={findFood}
          >
            sniff out a new food
          </Button>
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
