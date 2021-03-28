import { Link } from 'react-router-dom';

import { Grid, Container, Card, Button } from '@material-ui/core';

function AdminPortal() {
  return (
    <Container maxWidth="md">
      <h2 className="page-title">Admin Portal</h2>
      <Card id="adminContainer">
        <Grid container justify="space-evenly" alignItems="center">
          <Grid item xs={6}>
            <Button
              variant="outlined"
              href="http://localhost:3000/#/admin/food"
            >
              Manage All Food
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              href="http://localhost:3000/#/admin/allergy"
            >
              Manage All Allergies
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

export default AdminPortal;
