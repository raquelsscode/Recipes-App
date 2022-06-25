import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import copy from 'clipboard-copy';
import { requestFoodById } from '../services/RequestAPI';
// import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import './ProgressFood.css';
import InputIngredient from '../Components/InputIngredient';

export default class ProgressFood extends React.Component {
  constructor() {
    super();

    this.state = {
      mealID: 0,
      cocktails: {},
      meals: {},
      mealsIngredients: [],
      mealImg: '',
      mealTitle: '',
      mealCategory: '',
      instructions: '',
      fav: false,
      isFinishButtonDisabled: true,
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

  handleInput = (node, name, checked) => {
    node.classList.toggle('markedIngredient');
    const { match: { params: { id } } } = this.props;
    const { meals } = this.state;

    if (checked) {
      if (!meals[id]) {
        this.setState((prevState) => ({
          meals: {
            ...prevState.meals,
            [id]: [],
          },
        }), () => {
          this.saveMarkedIngredient(id, name);
        });
      } else {
        this.saveMarkedIngredient(id, name);
      }
    } else {
      this.setState((prevState) => ({
        meals: {
          ...prevState.meals,
          [id]: meals[id].filter((ingredient) => ingredient !== name),
        },
      }), this.handleLocalStorage);
    }
  }

  share = (e) => {
    const { location } = this.props;
    e.target.innerText = 'Link copied!';
    copy(`http://localhost:3000${location.pathname}`);
  };

  favorite = () => {
    const { fav } = this.state;
    if (fav) {
      document.getElementById('fav').src = whiteHeartIcon;
    } else {
      document.getElementById('fav').src = blackHeartIcon;
    }
    this.setState((prevState) => ({ fav: !prevState.fav }));
  };

  prepareIngredients = async () => {
    const { match: { params: { id } } } = this.props;

    const idNumber = Number(id);

    const food = await requestFoodById(idNumber);

    const { meals } = food;

    const ingredients = [];
    const PROPS_LIMITER = 20;

    for (let i = 1; i <= PROPS_LIMITER; i += 1) {
      if (meals[0][`strIngredient${i}`] !== null
        && meals[0][`strIngredient${i}`] !== undefined
        && meals[0][`strIngredient${i}`] !== '') {
        ingredients.push(meals[0][`strIngredient${i}`]);
      }
    }

    this.setState({
      mealID: id,
      mealsIngredients: ingredients,
      mealImg: meals[0].strMealThumb,
      mealTitle: meals[0].strMeal,
      mealCategory: meals[0].strCategory,
      instructions: meals[0].strInstructions,
    });
  }

  setLocalStorage = () => {
    if (!localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else {
      const localStorageItens = localStorage.getItem('inProgressRecipes');
      const localStorageItensObj = JSON.parse(localStorageItens);

      this.setState({
        meals: localStorageItensObj.meals,
      });
    }
  }

  isFinished = (allIngredients, ingredientsChecked) => {
    if (allIngredients === ingredientsChecked) {
      this.setState({ isFinishButtonDisabled: false });
    } else {
      this.setState({ isFinishButtonDisabled: true });
    }
  }

  finishRecipe = () => {
    const { history } = this.props;
    history.push('/done-recipes');
  }

  componentDidMount = () => {
    this.setLocalStorage();
    this.prepareIngredients();
  }

  render() {
    const {
      mealsIngredients,
      mealImg,
      mealTitle,
      mealCategory, instructions, mealID, isFinishButtonDisabled } = this.state;
    return (
      <>
        <img
          src={ mealImg }
          data-testid="recipe-photo"
          alt="Prototipo"
          className="img-detail"
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
              Compartilhar
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
            <InputIngredient
              key={ index }
              handleInput={ this.handleInput }
              finish={ this.isFinished }
              ingredient={ ingredient }
              mealId={ mealID }
              index={ index }
            />
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
          onClick={ this.finishRecipe }
          disabled={ isFinishButtonDisabled }
        >
          Finish Recipe
        </Button>
      </>
    );
  }
}

ProgressFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }) }).isRequired,
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
