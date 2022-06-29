import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import copy from 'clipboard-copy';
import { requestDrinkById } from '../services/RequestAPI';
// import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import './Progress.css';
import InputIngredient from '../Components/InputIngredient';

export default class ProgressDrink extends React.Component {
  constructor() {
    super();

    this.state = {
      drinkID: 0,
      cocktails: {},
      meals: {},
      drinksIngredients: [],
      drinkImg: '',
      drinkTitle: '',
      drinkCategory: '',
      instructions: '',
      // fav: false,
      isFinishButtonDisabled: true,
      qtdCheckbox: 0,
    };
  }

  handleLocalStorage = () => {
    const { cocktails, meals, qtdCheckbox, drinksIngredients } = this.state;
    const inProgressRecipes = {
      cocktails,
      meals,
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    if (qtdCheckbox === drinksIngredients.length) {
      this.setState({ isFinishButtonDisabled: false });
    } else {
      this.setState({ isFinishButtonDisabled: true });
    }
  }

  saveMarkedIngredient = (ID, name) => {
    this.setState((prevState) => ({
      cocktails: {
        ...prevState.cocktails,
        [ID]: [...prevState.cocktails[ID], name],
      },
    }), this.handleLocalStorage);
  }

  handleInput = ({ target }) => {
    target.parentNode.classList.toggle('markedIngredient');
    const { match: { params: { id } } } = this.props;
    const { cocktails } = this.state;
    const { name, checked } = target;

    if (checked) {
      this.setState((prevState) => ({ qtdCheckbox: prevState.qtdCheckbox + 1 }));
      if (!cocktails[id]) {
        this.setState((prevState) => ({
          cocktails: {
            ...prevState.cocktails,
            [id]: [],
          },
        }), () => {
          this.saveMarkedIngredient(id, name);
        });
      } else {
        this.saveMarkedIngredient(id, name);
      }
    } else {
      this.setState((prevState) => ({ qtdCheckbox: prevState.qtdCheckbox - 1 }));
      this.setState((prevState) => ({
        cocktails: {
          ...prevState.cocktails,
          [id]: cocktails[id].filter((ingredient) => ingredient !== name),
        },
      }), this.handleLocalStorage);
    }
  }

  share = (e) => {
    const { location, match: { params: { id } } } = this.props;
    console.log(location);
    e.target.innerText = 'Link copied!';
    copy(`http://localhost:3000/drinks/${id}`);
  };

  prepareIngredients = async () => {
    const { match: { params: { id } } } = this.props;

    const idNumber = Number(id);

    const drink = await requestDrinkById(idNumber);
    console.log(drink);

    const { drinks } = drink;

    const ingredients = [];
    const PROPS_LIMITER = 20;

    for (let i = 1; i <= PROPS_LIMITER; i += 1) {
      if (drinks[0][`strIngredient${i}`] !== null
        && drinks[0][`strIngredient${i}`] !== undefined
        && drinks[0][`strIngredient${i}`] !== '') {
        ingredients.push(drinks[0][`strIngredient${i}`]);
      }
    }

    this.setState({
      drinkID: id,
      drinksIngredients: ingredients,
      drinkImg: drinks[0].strDrinkThumb,
      drinkTitle: drinks[0].strDrink,
      drinkCategory: drinks[0].strCategory,
      instructions: drinks[0].strInstructions,
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
      const localStorageItensObj = JSON.parse(localStorage.getItem('inProgressRecipes'));

      this.setState({
        meals: localStorageItensObj.meals,
        cocktails: localStorageItensObj.cocktails,
      });
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
      drinksIngredients,
      drinkImg,
      drinkTitle,
      drinkCategory,
      instructions, drinkID, isFinishButtonDisabled, cocktails } = this.state;
    return (
      <>
        <img
          src={ drinkImg }
          data-testid="recipe-photo"
          alt="Prototipo"
          className="img-detail"
        />

        <div className="wrapperTitleButton">

          <h1 data-testid="recipe-title">{ drinkTitle }</h1>

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

        <p data-testid="recipe-category">{ drinkCategory }</p>
        <section>
          <h3>Ingredientes</h3>
          { drinksIngredients.map((ingredient, index) => (
            <InputIngredient
              key={ index }
              handleInput={ this.handleInput }
              finish={ this.isFinished }
              ingredient={ ingredient }
              drinkID={ drinkID }
              index={ index }
              checked={ cocktails[drinkID] && cocktails[drinkID]
                .some((item) => item === ingredient) }
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

ProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }) }).isRequired,
  location: PropTypes.shape().isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
};
