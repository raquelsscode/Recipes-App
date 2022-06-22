import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HeaderSearch from './searchHeader';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      inputVisible: false,
    };
    this.handleClickSearch = this.handleClickSearch.bind(this);
  }

  handleClickSearch() {
    const { inputVisible } = this.state;
    this.setState({ inputVisible: !inputVisible });
  }

  render() {
    const { inputVisible } = this.state;
    return (
      <header>
        <section>
          <button
            data-testid="profile-top-btn"
            type="button"
          >
            <Link to="/profile">
              <img
                src={ ProfileIcon }
                alt="profile-icon"
              />
            </Link>
          </button>
          <h1 data-testid="page-title">title</h1>

          <button
            data-testid="search-top-btn"
            type="button"
            onClick={ this.handleClickSearch }
          >
            <img
              src={ SearchIcon }
              alt="search-icon"
            />
          </button>
          {inputVisible && <HeaderSearch />}
        </section>
      </header>
    );
  }
}
export default Header;
