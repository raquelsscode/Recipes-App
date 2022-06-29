import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ingredientName } from '../redux/actions/index';

class ExploreIngredients extends React.Component {
  constructor() {
    super();
    this.state = {
      ingredients: [],
      choosed: '',
    };
  }

  componentDidMount() {
    this.getIngredient();
  }

  getIngredientFood = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();
    return data;
  }

  filterByIngredient = async (index, { target }) => {
    const { qualquerCoisa } = this.props;
    const { value } = target;
    console.log(value);
    /* const { history } = this.props; */
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${index}`);
    const data = await response.json();
    console.log(data);
    this.setState = ({
      choosed: index,
    });
    (qualquerCoisa((this.state)));
    console.log(index);
    /* history.push('/foods'); */
    return data;
  }

  getIngredient = async () => {
    const maxIngredients = 12;
    const data = await this.getIngredientFood();
    this.setState({
      ingredients: data.meals.slice(0, maxIngredients),
    });
    return data.meals.slice(0, maxIngredients);
  }

  render() {
    const { ingredients, choosed } = this.state;
    console.log(choosed);
    return (
      <div>
        {ingredients.map((ingredient, index) => (
          <div
            key={ index }
            data-testid={ `${index}-ingredient-card` }
            onKeyDown={ this.filterByIngredient }
            onClick={
              (event) => this.filterByIngredient(ingredient.strIngredient, event)
            }
            role="button"
            tabIndex={ 0 }
            value="teste"
          >
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

const mapDispatchToProps = (dispatch) => ({
  qualquerCoisa: (payload) => dispatch(ingredientName(payload)),
});

ExploreIngredients.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  qualquerCoisa: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(ExploreIngredients);
