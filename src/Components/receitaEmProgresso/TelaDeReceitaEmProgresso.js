import React from 'react';
import Button from 'react-bootstrap/Button';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './TelaDeReceitaEmProgresso.css';

export default class TelaDeReceitaEmProgresso extends React.Component {
  constructor() {
    super();

    this.state = {
      // cocktails: {},
      meals: {},
    };
  }

  saveMarkedIngredient = (ID, name) => {
    console.log(ID);
    this.setState((prevState) => ({
      meals: {
        ...prevState.meals,
        [ID]: [...prevState.meals[ID], name],
      },
    }));
  }

  handleInput = ({ target }) => {
    // const inProgressRecipesObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    target.parentNode.classList.toggle('markedIngredient');

    const ID = 52772;
    const { name } = target;
    const { meals } = this.state;

    if (!meals[ID]) {
      this.setState(({
        meals: { [ID]: [] },
      }), () => {
        this.saveMarkedIngredient(ID, name);
      });
    } else {
      this.saveMarkedIngredient(ID, name);
    }
  }

  componentDidMount = () => {
    if (!localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = {
        cocktails: {
        },
        meals: {
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }
  }

  render() {
    const ingredients = [
      { id: 0, name: 'penne rigate' },
      { id: 1, name: 'olive oil' },
      { id: 2, name: 'garlic' }];
    return (
      <>
        <img
          src="https://media-cdn.tripadvisor.com/media/photo-s/16/eb/39/c5/burrito-tacos-e-nachos.jpg"
          data-testid="recipe-photo"
          alt="Prototipo"
        />

        <div className="wrapperTitleButton">

          <h1 data-testid="recipe-title">Título</h1>

          <section className="shareAndFavButtons">
            <button className="shareButton" type="button" data-testid="share-btn">
              <img src={ shareIcon } alt="share button" />
            </button>

            <button className="favoriteButton" type="button" data-testid="favorite-btn">
              <img src={ whiteHeartIcon } alt="favorite button" />
            </button>
          </section>

        </div>

        <p data-testid="recipe-category">Texto da categoria</p>
        <section>
          <h3>Ingredientes</h3>
          { ingredients.map((ingredient, index) => (
            <div key={ ingredient.id }>
              <label htmlFor={ ingredient.id }>
                <input
                  id={ ingredient.id }
                  name={ ingredient.name }
                  type="checkbox"
                  onClick={ this.handleInput }
                  data-testid={ `${index}-ingredient-step` }
                />
                { ingredient.name }
              </label>
            </div>
          )) }
        </section>

        <section data-testid="instructions">
          <h3>Instruções</h3>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
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
