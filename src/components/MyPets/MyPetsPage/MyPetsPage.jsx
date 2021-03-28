import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

import AddPet from '../AddPet/AddPet';

import { Grid, Paper, Container, Button, Dialog } from '@material-ui/core';

import './MyPetsPage.css';

function MyPetsPage() {
  const history = useHistory();

  const pets = useSelector((store) => store.user.userPets);

  const [open, setOpen] = useState(false);

  const handleOpen = (form) => {
    setClickedForm(form);
    setOpen(true);
  }; // end handleOpen

  const handleClose = () => {
    setOpen(false);
  }; // end handleClose

  return (
    <Container maxWidth="md">
      <h2 className="page-title">My Pets</h2>
      <Button
        variant="text"
        color="primary"
        size="small"
        onClick={() => setOpen(true)}
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

      <Dialog open={open} onClose={handleClose}>
        <AddPet handleClose={handleClose} />
      </Dialog>
    </Container>
  );
}

export default MyPetsPage;
