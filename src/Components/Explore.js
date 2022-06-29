import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Footer from './footer/Footer';

class Explore extends React.Component {
  redirectForExploreFoods = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/explore/foods');
  }

  redirectForExploreDrinks = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/explore/drinks');
  }

  render() {
    return (
      <div>
        <Header title="Explore" btnSearch="false" />
        <button
          type="button"
          data-testid="explore-foods"
          onClick={ this.redirectForExploreFoods }
        >
          Explore Foods
        </button>

        <button
          type="button"
          data-testid="explore-drinks"
          onClick={ this.redirectForExploreDrinks }
        >
          Explore Drinks
        </button>
        <Footer />
      </div>
    );
  }
}

Explore.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Explore;
