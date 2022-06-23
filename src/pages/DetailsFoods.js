import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getFoodById } from '../services/TestApi';

function DetailsFoods() {
  const history = useHistory();
  const { location } = history;
  const POS_IN_PATHNAME = 3;
  const ARR_POS = 2;
  const id = location.pathname.split('/', POS_IN_PATHNAME)[ARR_POS];
  const [meal, setMeal] = useState({});
  const [toRender, setToRender] = useState(false);
  const ingredients = [];
  const measure = [];

  useEffect(() => {
    getFoodById(id).then(({ meals }) => {
      setMeal(meals[0]);
      setToRender(true);
    });
  }, []);

  const PROPS_LIMITER = 20;

  if (toRender) {
    for (let i = 1; i <= PROPS_LIMITER; i += 1) {
      if (meal[`strIngredient${i}`] !== null
        && meal[`strIngredient${i}`] !== undefined
        && meal[`strIngredient${i}`] !== '') {
        ingredients.push(meal[`strIngredient${i}`]);
        measure.push(meal[`strMeasure${i}`]);
      }
    }
  }

  const handleClick = () => {
    history.push(`/foods/${id}/in-progress`);
  };

  return toRender && (
    <div>
      <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      <img
        src={ meal.strMealThumb }
        data-testid="recipe-photo"
        alt={ meal.strMeal }
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
      <p data-testid="instructions">{ meal.strInstructions }</p>
      <h3>Vídeo</h3>
      <a data-testid="video" href={ meal.strYoutube }>Link aqui</a>
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

export default DetailsFoods;
