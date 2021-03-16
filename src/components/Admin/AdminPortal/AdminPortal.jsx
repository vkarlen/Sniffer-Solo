import { Link } from 'react-router-dom';

function AdminPortal() {
  return (
    <div>
      <h2>Admin Portal</h2>

      <Link to="/admin/food">Manage Foods</Link>

      <Link to="/admin/allergy">Manage Allergies</Link>
    </div>
  );
}

export default AdminPortal;
