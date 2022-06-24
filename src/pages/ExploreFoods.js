import React from 'react';
import PropTypes from 'prop-types';

class ExploreFoods extends React.Component {
  redirectForIngredient = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/explore/foods/ingredients');
  }

  redirectForNationality = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/explore/foods/nationalities');
  }

  getRandomMeal = async () => {
    const { history } = this.props;
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const data = await fetch(URL);
    const response = await data.json();
    history.push(`/foods/${response.meals[0].idMeal}`);
    console.log(response);
    return response;
  }

  render() {
    return (
      <div>
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ this.redirectForIngredient }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-by-nationality"
          onClick={ this.redirectForNationality }
        >
          By Nationality
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ this.getRandomMeal }
        >
          Surprise me!
        </button>
      </div>
    );
  }
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreFoods;
