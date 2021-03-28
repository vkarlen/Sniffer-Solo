import AddAllergy from '../AddAllergy/AddAllergy';
import AllergyTable from '../AllergyTable/AllergyTable';

import { Grid, Paper, Container, Button } from '@material-ui/core';

function AdminAllergies() {
  return (
    <Container maxWidth="md">
      <h2>Manage Allergies</h2>

      <AddAllergy />

      <AllergyTable />
    </Container>
  );
}

export default AdminAllergies;
