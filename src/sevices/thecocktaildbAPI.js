async function thecocktaildb(id) {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const data = await fetch(endpoint);
  const response = await data.json();
  return response;
}
export default thecocktaildb;
