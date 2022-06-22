import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class DrinksCard extends React.Component {
  render() {
    const { id, index, strDrinkThumb, strDrink } = this.props;
    return (
      <Link to={ `/drinks/${id}` }>
        <div
          className="testeDois"
          data-testid={ `${index}-recipe-card` }
        >
          <img
            className="card-img-top"
            src={ strDrinkThumb }
            alt={ strDrink }
            width="200px"
            data-testid={ `${index}-card-img` }
          />
          <h2
            data-testid={ `${index}-card-name` }
          >
            {strDrink}

          </h2>
        </div>
      </Link>
    );
  }
}

DrinksCard.propTypes = {
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
  strDrink: PropTypes.string.isRequired,
};

export default DrinksCard;
