async function requestFoods() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}

export async function requestDrinks() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}

export async function requestCategoryDrinks() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}

export async function requestCategorys() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}
export async function requestIngredient(ingredient) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}
export async function requestName(name) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}
export async function requestFirstLetter(letter) {
  const URL = `https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}

export async function requestEndPoint(EndPoint) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${EndPoint}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}
export async function requestPointDrinks(categoryDrink) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${categoryDrink}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}
export default requestFoods;

export async function requestFoodById(id) {
  const URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}

export async function requestDrinkById(id) {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}
