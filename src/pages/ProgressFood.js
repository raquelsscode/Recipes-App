import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import copy from 'clipboard-copy';
import { requestFoodById } from '../services/RequestAPI';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ProgressFood.css';

export default class TelaDeReceitaEmProgresso extends React.Component {
  constructor() {
    super();

    this.state = {
      cocktails: {},
      meals: {},
      mealsIngredients: [],
      mealImg: '',
      mealTitle: '',
      mealCategory: '',
      instructions: '',
      fav: false,
    };
  }

  handleLocalStorage = () => {
    const { cocktails, meals } = this.state;
    const inProgressRecipes = {
      cocktails,
      meals,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }

  saveMarkedIngredient = (ID, name) => {
    this.setState((prevState) => ({
      meals: {
        ...prevState.meals,
        [ID]: [...prevState.meals[ID], name],
      },
    }), this.handleLocalStorage);
  }

  handleInput = ({ target }) => {
    target.parentNode.classList.toggle('markedIngredient');

    const ID = 52772;
    const { name } = target;
    const { meals } = this.state;

    if (target.checked) {
      if (!meals[ID]) {
        this.setState(({
          meals: { [ID]: [] },
        }), () => {
          this.saveMarkedIngredient(ID, name);
        });
      } else {
        this.saveMarkedIngredient(ID, name);
      }
    } else {
      this.setState((prevState) => ({
        meals: {
          ...prevState.meals,
          [ID]: meals[ID].filter((ingredient) => ingredient !== name),
        },
      }), this.handleLocalStorage);
    }
  }

  share = (e) => {
    console.log(this.props);
    const { location } = this.props;
    e.target.innerText = 'Link copied!';
    copy(`http://localhost:3000${location.pathname}`);
  };

  favorite = () => {
    const { fav } = this.state;
    if (fav) {
      document.getElementById('fav').src = whiteHeartIcon;
    } else {
      console.log('false');
      document.getElementById('fav').src = blackHeartIcon;
      console.log(document.getElementById('fav'));
    }
    this.setState((prevState) => ({ fav: !prevState.fav }));
  };

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;

    const idNumber = Number(id);

    const food = await requestFoodById(idNumber);

    console.log(food);

    const { meals } = food;

    const measure = [];
    const PROPS_LIMITER = 20;

    for (let i = 1; i <= PROPS_LIMITER; i += 1) {
      if (meals[0][`strIngredient${i}`] !== null
        && meals[0][`strIngredient${i}`] !== undefined
        && meals[0][`strIngredient${i}`] !== '') {
        measure.push(meals[0][`strIngredient${i}`]);
      }
    }

    this.setState({
      mealsIngredients: measure,
      mealImg: meals[0].strMealThumb,
      mealTitle: meals[0].strMeal,
      mealCategory: meals[0].strCategory,
      instructions: meals[0].strInstructions,
    });

    if (!localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }

  render() {
    const {
      mealsIngredients, mealImg, mealTitle, mealCategory, instructions } = this.state;
    return (
      <>
        <img
          src={ mealImg }
          data-testid="recipe-photo"
          alt="Prototipo"
        />

        <div className="wrapperTitleButton">

          <h1 data-testid="recipe-title">{ mealTitle }</h1>

          <section className="shareAndFavButtons">
            <button
              className="shareButton"
              type="button"
              data-testid="share-btn"
              onClick={ this.share }
            >
              <img src={ shareIcon } alt="share button" />
            </button>

            <button
              className="favoriteButton"
              type="button"
              data-testid="favorite-btn"
              onClick={ this.favorite }
            >
              <img id="fav" src={ whiteHeartIcon } alt="favorite button" />
            </button>
          </section>

        </div>

        <p data-testid="recipe-category">{ mealCategory }</p>
        <section>
          <h3>Ingredientes</h3>
          { mealsIngredients.map((ingredient, index) => (
            <div key={ index }>
              <label htmlFor={ ingredient }>
                <input
                  id={ ingredient }
                  name={ ingredient }
                  type="checkbox"
                  onClick={ this.handleInput }
                  data-testid={ `${index}-ingredient-step` }
                />
                { ingredient }
              </label>
            </div>
          )) }
        </section>

        <section data-testid="instructions">
          <h3>Instruções</h3>
          <p>
            { instructions }
          </p>
        </section>

        <Button
          variant="success"
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finish Recipe
        </Button>
      </>
    );
  }
}

TelaDeReceitaEmProgresso.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }) }).isRequired,
  location: PropTypes.shape().isRequired,
};
