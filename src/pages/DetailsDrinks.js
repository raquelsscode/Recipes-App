import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { getDrinkById } from '../services/TestApi';
import RecipesContext from '../context/RecipesContext';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';

function DetailsDrinks() {
  const history = useHistory();
  const { location } = history;
  const POS_IN_PATHNAME = 3;
  const ARR_POS = 2;
  const MEAL_LIMITER = 6;
  const id = location.pathname.split('/', POS_IN_PATHNAME)[ARR_POS];

  const [fav, setFav] = useState(false);
  const [drink, setDrink] = useState({});
  const [toRender, setToRender] = useState(false);

  const ingredients = [];
  const measure = [];

  const { foodRandom, data } = useContext(RecipesContext);

  useEffect(() => {
    getDrinkById(id).then(({ drinks }) => {
      setDrink(drinks[0]);
      foodRandom();
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

  const share = (e) => {
    e.target.innerText = 'Link copied!!';
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
      <h1 data-testid="recipe-title">{ drink.strDrink }</h1>
      <p data-testid="recipe-category">{ drink.strAlcoholic }</p>
      <img
        src={ drink.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ drink.strdrink }
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
        { data.food.map((f, i) => (
          i < MEAL_LIMITER && (
            <section
              key={ i }
              data-testid={ `${i}-recomendation-card` }
              className="card"
            >
              <h3
                data-testid={ `${i}-recomendation-title` }
              >
                { f.strMeal }
              </h3>
              <img
                data-testid={ `${i}-card-img` }
                src={ f.strMealThumb }
                alt={ f.strMeal }
              />
            </section>
          )
        ))}
      </div>
    </div>
  );
}

export default DetailsDrinks;
