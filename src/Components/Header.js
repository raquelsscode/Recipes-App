import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import HeaderSearch from './searchHeader';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      inputVisible: false,
      redirect: false,
      btnSearchVisible: false,
    };
    this.clickSearch = this.clickSearch.bind(this);
    this.handleClickProfile = this.handleClickProfile.bind(this);
    this.renderBtn = this.renderBtn.bind(this);
    this.propBtnSearch = this.propBtnSearch.bind(this);
  }

  componentDidMount() {
    this.propBtnSearch();
  }

  handleClickProfile() {
    this.setState({ redirect: true });
  }

  propBtnSearch() {
    const { btnSearch } = this.props;
    if (btnSearch === 'true') {
      this.setState({ btnSearchVisible: true });
    } else { this.setState({ btnSearchVisible: false }); }
  }

  clickSearch() {
    const { inputVisible } = this.state;
    this.setState({ inputVisible: !inputVisible });
  }

  renderBtn() {
    return (
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ this.clickSearch }
        src={ SearchIcon }
      >
        <img src={ SearchIcon } alt="search-icon" />
      </button>
    );
  }

  render() {
    const { inputVisible, redirect, btnSearchVisible } = this.state;
    const { title } = this.props;
    return (
      <header>
        <section>
          <button
            data-testid="profile-top-btn"
            type="button"
            src={ ProfileIcon }
            onClick={ this.handleClickProfile }
            alt="profile-icon"
          >
            <img src={ ProfileIcon } alt="profile-icon" />
          </button>
          {btnSearchVisible
          && this.renderBtn()}
          {redirect && <Redirect to="/profile/" />}
          <h1 data-testid="page-title">{title}</h1>
          {inputVisible && <HeaderSearch />}
        </section>
      </header>
    );
  }
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  btnSearch: PropTypes.string.isRequired,
};
export default Header;
