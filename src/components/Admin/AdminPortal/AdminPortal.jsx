import { Link } from 'react-router-dom';

function AdminPortal() {
  return (
    <Container maxWidth="md">
      <h2 className="page-title">Admin Portal</h2>

      <Link to="/admin/food">Manage Foods</Link>

      <Link to="/admin/allergy">Manage Allergies</Link>
    </Container>
  );
}

export default AdminPortal;
