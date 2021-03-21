function FoodRow({ food }) {
  return (
    <tr>
      <td>
        <img src={food.image} className="adminImage" />
      </td>
      <td>{food.brand}</td>
      <td>{food.description}</td>
      <td>{food.ingredients.join(', ')}</td>
    </tr>
  );
}

export default FoodRow;
