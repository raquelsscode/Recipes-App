import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ReceitaCard extends React.Component {
  render() {
    const { id, index, strMealThumb, strMeal } = this.props;
    return (
      <Link to={ `/foods/${id}` }>
        <div
          className="testeDois"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="card-img-top"
            src={ strMealThumb }
            alt={ strMeal }
            width="200px"
            data-testid={ `${index}-card-img` }
          />
          <h2
            data-testid={ `${index}-card-name"` }
          >
            {strMeal}

          </h2>
        </div>
      </Link>
    );
  }
}

ReceitaCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  strMealThumb: PropTypes.string.isRequired,
  strMeal: PropTypes.string.isRequired,
};

export default ReceitaCard;
