import { useDispatch, useSelector } from 'react-redux';

function MyPetsPage() {
  const pets = useSelector((store) => store.user.userPets);

  return (
    <div>
      <h2>My Pets</h2>
      <button>+ add a pet</button>
      {pets.length === 0 ? (
        <p>Please add a pet!</p>
      ) : (
        <div>
          {pets.map((pet) => {
            return (
              <div key={pet.id}>
                <img src={pet.image_url} alt={pet.name} />
                <p>{pet.name}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyPetsPage;
