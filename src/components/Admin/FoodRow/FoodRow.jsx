function FoodRow({ food }) {
  let ingredients = '';

  for (const item of food.ingredients) {
    ingredients += `${item}, `;
  }

  return (
    <tr>
      <td>{food.brand}</td>
      <td>{food.description}</td>
      <td>{ingredients}</td>
    </tr>
  );
}

export default FoodRow;
