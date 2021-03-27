import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Grid, Paper, Container, Button } from '@material-ui/core';

import './MyPetsPage.css';

function MyPetsPage() {
  const history = useHistory();

  const pets = useSelector((store) => store.user.userPets);

  return (
    <Container maxWidth="md">
      <h2 className="page-title">My Pets</h2>
      <Button
        variant="text"
        color="primary"
        size="small"
        onClick={() => history.push('/addapet')}
      >
        + add a pet
      </Button>

      {pets.length === 0 ? (
        <p>Please add a pet!</p>
      ) : (
        <Grid container spacing={2}>
          {pets.map((pet) => {
            return (
              <Grid item xs={6} md={3} key={pet.id}>
                <Paper
                  className="petCard"
                  onClick={() => {
                    history.push(`/pets/${pet.id}`);
                  }}
                >
                  <img
                    src={pet.image_url}
                    alt={pet.name}
                    className="petImage"
                  />
                  <p>{pet.name}</p>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
}

export default MyPetsPage;
