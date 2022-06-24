import React from 'react';

class ExploreIngredientsDrinks extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredientsDrinks: [],
    };
  }

  componentDidMount() {
    this.getIngredient();
  }

getIngredientDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
  const data = await response.json();
  return data;
}

getIngredient = async () => {
  const maxIngredients = 12;
  const data = await this.getIngredientDrink();
  this.setState({
    ingredientsDrinks: data.drinks.slice(0, maxIngredients),
  });
  return data.drinks.slice(0, maxIngredients);
}

render() {
  const { ingredientsDrinks } = this.state;
  return (
    <div>
      {ingredientsDrinks.map((ingredientDrink, index) => (
        <div key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredientDrink.strIngredient1}-Small.png` }
            alt={ ingredientDrink.strIngredient1 }
            data-testid={ `${index}-card-img` }
          />

          <p data-testid={ `${index}-card-name` }>
            {ingredientDrink.strIngredient1}
          </p>
        </div>
      ))}
    </div>
  );
}
}

export default ExploreIngredientsDrinks;
