import { useDispatch, useSelector } from 'react-redux';

function MyPetsPage() {
  const pets = useSelector((store) => store.user.userPets);

  return (
    <div>
      <h2>My Pets</h2>
      <button>+ add a pet</button>
      <div>woof</div>
    </div>
  );
}

export default MyPetsPage;
