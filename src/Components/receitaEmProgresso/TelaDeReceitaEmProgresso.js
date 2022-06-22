import React from 'react';
import Button from 'react-bootstrap/Button';
import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './TelaDeReceitaEmProgresso.css';

export default class TelaDeReceitaEmProgresso extends React.Component {
  render() {
    const ingredients = ['1', '2', '3'];
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
            <div key={ ingredient }>
              <label htmlFor={ ingredient }>
                <input
                  id={ ingredient }
                  type="checkbox"
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
