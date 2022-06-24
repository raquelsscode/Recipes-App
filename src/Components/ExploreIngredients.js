import React from 'react';
import { requestIngredient } from '../services/RequestAPI';

class ExploreIngredients extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
    };
  }

  componentDidMount() {
    this.getIngredient();
  }

  getIngredient = async () => {
    const maxIngredients = 12;
    const data = await requestIngredient('Salt');
    console.log(data);
    this.setState = {
      ingredients: data.slice(0, maxIngredients),
    };
    return data.slice(0, maxIngredients);
  }

  render() {
    const { ingredients } = this.state;
    console.log(ingredients);
    return (
      <div>
        {ingredients.map((ingredient, index) => (
          <div key={ index } data-testid={ `${index}-ingredient-card` }>
            <img
              src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
              alt={ ingredient.strIngredient }
              data-testid={ `${index}-card-img` }
            />

            <p data-testid={ `${index}-card-name` }>
              {ingredient.strIngredient}
            </p>
          </div>
        ))}
      </div>
    );
  }
}

export default ExploreIngredients;
