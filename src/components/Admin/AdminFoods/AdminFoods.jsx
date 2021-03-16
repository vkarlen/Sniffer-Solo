import AddFood from '../AddFood/AddFood';
import FoodTable from '../FoodTable/FoodTable';

function AdminFoods() {
  return (
    <div>
      <h2>Foods</h2>

      <AddFood />

      <FoodTable />
    </div>
  );
}

export default AdminFoods;
