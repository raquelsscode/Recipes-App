async function requestFoods() {
  const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
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
export default requestFoods;
