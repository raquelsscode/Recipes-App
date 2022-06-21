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
    if (radioSelected === 'ingredient') {
      requestIngredient(inputTextValue);
    }
    if (radioSelected === 'name') {
      requestName(inputTextValue);
    }
    if (radioSelected === 'first-letter') {
      if (inputTextValue.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      }
      requestFirstLetter(inputTextValue);
    }
  }

  render() {
    return (
      <form>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            name="search-type"
            value="ingredient"
            onClick={ this.handleClickRadio }
          />
          Busca por ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            id="name-search-radio"
            name="search-type"
            data-testeid="name-search-radio"
            value="name"
            onClick={ this.handleClickRadio }
          />
          Busca por nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            id="first-letter-search-radio"
            data-testeid="first-letter-search-radio"
            name="search-type"
            value="first-letter"
            onClick={ this.handleClickRadio }
          />
          Busca da primeira letra
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
