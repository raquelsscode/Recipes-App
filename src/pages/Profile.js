import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Footer from '../Components/footer/Footer';

class Profile extends React.Component {
  redirectForFavoritesRecipes = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/favorite-recipes');
  }

  redirectForDoneRecipes = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/done-recipes');
  }

  logOut = (event) => {
    event.preventDefault();
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  render() {
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    return (
      <div>
        <Header title="Profile" btnSearch="false" />
        <p data-testid="profile-email">{userLocalStorage.email}</p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ this.redirectForDoneRecipes }
        >
          Done Recipes

        </button>

        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ this.redirectForFavoritesRecipes }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ this.logOut }
        >
          Logout
        </button>
        <Footer />
      </div>

    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
