async function themealdb(id) {
  const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(endpoint);
  const response = await data.json();
  return response;
}
export default themealdb;
