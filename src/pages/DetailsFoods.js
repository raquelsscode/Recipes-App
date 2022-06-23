import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getFoodById } from '../services/TestApi';
import RecipesContext from '../context/RecipesContext';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailsFoods() {
  const history = useHistory();
  const { location } = history;
  const POS_IN_PATHNAME = 3;
  const ARR_POS = 2;
  const DRINK_LIMITER = 6;
  const id = location.pathname.split('/', POS_IN_PATHNAME)[ARR_POS];

  const [fav, setFav] = useState(false);
  const [meal, setMeal] = useState({});
  const [toRender, setToRender] = useState(false);

  const ingredients = [];
  const measure = [];

  const { drinkRandom, data } = useContext(RecipesContext);

  useEffect(() => {
    getFoodById(id).then(({ meals }) => {
      setMeal(meals[0]);
      drinkRandom();
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

  const share = (e) => {
    e.target.innerText = 'Link copied!';
    copy(`http://localhost:3000${location.pathname}`);
  };

  const favorite = () => {
    if (fav) {
      document.getElementById('fav').src = WhiteHeartIcon;
    } else {
      document.getElementById('fav').src = BlackHeartIcon;
    }
    setFav(!fav);
  };

  return toRender && (
    <div>
      <h1 data-testid="recipe-title">{ meal.strMeal }</h1>
      <p data-testid="recipe-category">{ meal.strCategory }</p>
      <img
        src={ meal.strMealThumb }
        data-testid="recipe-photo"
        alt={ meal.strMeal }
        className="img-detail"
      />
      <div className="group-buttons">
        <button
          onClick={ (e) => share(e) }
          type="button"
          data-testid="share-btn"
        >
          Compartilhar
        </button>
        <button onClick={ () => favorite() } type="button">
          <img
            id="fav"
            src={ WhiteHeartIcon }
            alt="favoritar"
            data-testid="favorite-btn"
          />
        </button>
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
        { data.drink.map((d, i) => (
          i < DRINK_LIMITER && (
            <section
              key={ i }
              data-testid={ `${i}-recomendation-card` }
              className="card"
            >
              <h3
                data-testid={ `${i}-recomendation-title` }
              >
                { d.strDrink }
              </h3>
              <img
                data-testid={ `${i}-card-img` }
                src={ d.strDrinkThumb }
                alt={ d.strDrink }
              />
            </section>
          )
        ))}
      </div>
    </div>
  );
}

export default DetailsFoods;
