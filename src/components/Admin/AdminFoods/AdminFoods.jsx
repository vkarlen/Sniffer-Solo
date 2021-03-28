import AddFood from '../AddFood/AddFood';
import FoodTable from '../FoodTable/FoodTable';

import { Grid, Paper, Container, Button } from '@material-ui/core';

function AdminFoods() {
  return (
    <Container maxWidth="md">
      <h2>Foods</h2>

      <AddFood />

      <FoodTable />
    </Container>
  );
}

export default AdminFoods;
