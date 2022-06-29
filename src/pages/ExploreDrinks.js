import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/footer/Footer';

class ExploreDrinks extends React.Component {
  redirectForIngredient = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/explore/drinks/ingredients');
  }

  getRandomDrink = async () => {
    const { history } = this.props;
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const data = await fetch(URL);
    const response = await data.json();
    history.push(`/drinks/${response.drinks[0].idDrink}`);
    console.log(response);
    return response;
  }

  render() {
    return (
      <div>
        <Header title="Explore Drinks" btnSearch="false" />
        <button
          type="button"
          data-testid="explore-by-ingredient"
          onClick={ this.redirectForIngredient }
        >
          By Ingredient
        </button>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ this.getRandomDrink }
        >
          Surprise me!
        </button>
        <Footer />
      </div>
    );
  }
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreDrinks;
