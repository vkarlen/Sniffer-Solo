import AddAllergy from '../AddAllergy/AddAllergy';
import AllergyTable from '../AllergyTable/AllergyTable';

function AdminAllergies() {
  return (
    <div>
      <h2>Manage Allergies</h2>

      <AddAllergy />

      <AllergyTable />
    </div>
  );
}

export default AdminAllergies;
