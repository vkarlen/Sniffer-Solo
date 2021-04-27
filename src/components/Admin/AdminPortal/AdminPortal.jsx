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
              href="http://sniffer-solo.herokuapp.com/#/admin/food"
            >
              Manage All Food
            </Button>
          </Grid>

          <Grid item xs={6}>
            <Button
              variant="outlined"
              href="http://sniffer-solo.herokuapp.com/#/admin/allergy"
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
