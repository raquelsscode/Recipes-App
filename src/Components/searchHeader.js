import React, { Component } from 'react';

class HeaderSearch extends Component {
  render() {
    return (
      <form>
        <label htmlFor="ingredient-search-radio">
          <input
            type="radio"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
          />
          Busca por ingrediente
        </label>
        <label htmlFor="name-search-radio">
          <input
            type="radio"
            id="name-search-radio"
            data-testeid="name-search-radio"
          />
          Busca por nome
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            type="radio"
            id="first-letter-search-radio"
            data-testeid="first-letter-search-radio"
          />
          Busca da primeira letra
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Buscar
        </button>
      </form>
    );
  }
}
export default HeaderSearch;
