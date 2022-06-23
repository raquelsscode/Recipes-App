import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getDrinkById } from '../services/TestApi';

function DetailsDrinks() {
  const history = useHistory();
  const { location } = history;
  const POS_IN_PATHNAME = 3;
  const ARR_POS = 2;
  const id = location.pathname.split('/', POS_IN_PATHNAME)[ARR_POS];
  const [drink, setDrink] = useState({});
  const [toRender, setToRender] = useState(false);
  const ingredients = [];
  const measure = [];

  useEffect(() => {
    getDrinkById(id).then(({ drinks }) => {
      setDrink(drinks[0]);
      setToRender(true);
    });
  }, []);

  const PROP_LIMITER = 20;

  if (toRender) {
    for (let i = 1; i <= PROP_LIMITER; i += 1) {
      if (drink[`strIngredient${i}`] !== null
      && drink[`strIngredient${i}`] !== undefined
      && drink[`strIngredient${i}`] !== '') {
        ingredients.push(drink[`strIngredient${i}`]);
        measure.push(drink[`strMeasure${i}`]);
      }
    }
  }

  const handleClick = () => {
    history.push(`/drinks/${id}/in-progress`);
  };

  return toRender && (
    <div>
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
      <img
        src={ drink.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ drink.strdrink }
      />
      <div className="group-buttons">
        <button type="button" data-testid="share-btn">Compartilhar</button>
        <button type="button" data-testid="favorite-btn">Favoritar</button>
      </div>
      <h3>Lista de Ingredientes:</h3>
      <ul>
        { ingredients.map((ing, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            { `${measure[i]} of ${ing}` }
          </li>
        )) }
      </ul>
      <h3>Instruções</h3>
      <p data-testid="instructions">{ drink.strInstructions }</p>
      <button
        type="button"
        onClick={ () => handleClick() }
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
      >
        Iniciar Receita
      </button>
      <h3>Receitas Recomendadas</h3>
      <div className="caroussel">
        <section data-testid="0-recomendation-card">Oi</section>
        <section data-testid="1-recomendation-card">Oi</section>
        <section data-testid="2-recomendation-card">Oi</section>
        <section data-testid="3-recomendation-card">Oi</section>
        <section data-testid="4-recomendation-card">Oi</section>
        <section data-testid="5-recomendation-card">Oi</section>
      </div>
    </div>
  );
}

export default DetailsDrinks;
