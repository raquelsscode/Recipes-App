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

export async function requestEndPoint(EndPoint) {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${EndPoint}`;
  const data = await fetch(URL);
  const response = await data.json();
  return response;
}
export default requestFoods;
