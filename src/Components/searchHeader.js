import React, { Component } from 'react';
import { requestIngredient, requestName,
  requestFirstLetter } from '../services/RequestAPI';

class HeaderSearch extends Component {
  constructor() {
    super();
    this.state = {
      radioSelected: '',
      inputTextValue: '',
    };
    this.handleClickRadio = this.handleClickRadio.bind(this);
    this.handleClickSubmit = this.handleClickSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClickRadio({ target }) {
    this.setState({ radioSelected: target.value });
  }

  handleChange({ target }) {
    this.setState({ inputTextValue: target.value });
  }

  handleClickSubmit() {
    const { radioSelected, inputTextValue } = this.state;
    if (radioSelected === 'Ingredient') {
      requestIngredient(inputTextValue);
    }
    if (radioSelected === 'Name') {
      requestName(inputTextValue);
    }
    if (radioSelected === 'First letter') {
      if (inputTextValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      requestFirstLetter(inputTextValue);
    }
  }

  render() {
    return (
      <form>
        <label htmlFor="Ingredient-search-radio">
          <input
            type="radio"
            id="Ingredient-search-radio"
            data-testid="ingredient-search-radio"
            name="search-type"
            value="Ingredient"
            onClick={ this.handleClickRadio }
          />
          Ingredient
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            id="name-search-radio"
            name="search-type"
            data-testeid="name-search-radio"
            value="Name"
            onClick={ this.handleClickRadio }
          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            id="first-letter-search-radio"
            data-testeid="first-letter-search-radio"
            name="search-type"
            value="First letter"
            onClick={ this.handleClickRadio }
          />
          First letter
        </label>
        <input
          type="text"
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ this.handleClickSubmit() }
        >
          Buscar
        </button>
      </form>
    );
  }
}
export default HeaderSearch;
