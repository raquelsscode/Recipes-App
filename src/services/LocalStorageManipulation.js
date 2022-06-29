export default function handleLocalStorage(cocktails, meals) {
  const inProgressRecipes = {
    cocktails,
    meals,
  };
  localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
}
