import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipesContext from './RecipesContext';
import
{
  getFoodName,
  getDrinkName,
  getFoodRandom,
  getDrinkRandom } from '../services/TestApi';

export default function RecipesProvider({ children }) {
  const [data, setData] = useState({ food: [], drink: [] });
  const history = useHistory();
  const { location: { pathname } } = history;

  const foodRandom = async () => {
    setData({ ...data, food: await getFoodRandom() });
  };

  const drinkRandom = async () => {
    setData({ ...data, drink: await getDrinkRandom() });
  };

  const getAPI = async (radio, textInput, path) => {
    switch (radio) {
    case ('name'):
      return path === '/foods'
        ? setData({
          ...data,
          food: await getFoodName(textInput) })
        : setData({
          ...data,
          drink: await getDrinkName(textInput) });

    default:
      break;
    }
  };

  useEffect(() => {
    if (pathname === '/foods'
      && (data.food !== null)) {
      const l = data.food.length;
      if (l > 0) {
        return l > 1
          ? history.push('/foods')
          : history.push(`/foods/${data.food[0].idMeal}`);
      }
    } if (pathname === '/drinks'
    && (data.drink !== null)) {
      const l = data.drink.length;
      if (l > 0) {
        return l > 1
          ? history.push('/drinks')
          : history.push(`/drinks/${data.drink[0].idDrink}`);
      }
    }
  }, [data]);

  const context = { getAPI, data, setData, foodRandom, drinkRandom };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
