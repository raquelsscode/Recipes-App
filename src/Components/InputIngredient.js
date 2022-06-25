import React from 'react';
import PropTypes from 'prop-types';

class InputIngredient extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
    };
  }

  inputChange = ({ target }) => {
    this.setState((prevState) => ({ checked: !prevState.checked }));
    this.isAllChecked();
    const { handleInput } = this.props;
    const { name } = target;
    handleInput(target.parentNode, name, target.checked);
  }

  isAllChecked = () => {
    const { finish } = this.props;
    const LABELS = document.querySelectorAll('label');
    const INGREDIENT_QTD = LABELS.length;
    let ingredientChecked = [];
    LABELS.forEach((item) => {
      if (item.firstChild.checked) {
        ingredientChecked = [...ingredientChecked, item];
      }
    });
    finish(INGREDIENT_QTD, ingredientChecked.length);
  }

  componentDidMount = () => {
    const { mealId, ingredient } = this.props;
    const localStorageItens = localStorage.getItem('inProgressRecipes');
    const localStorageItensObj = JSON.parse(localStorageItens);

    if (localStorageItensObj.meals[mealId]) {
      const isChecked = localStorageItensObj.meals[mealId]
        .some((element) => element === ingredient);
      if (isChecked) {
        this.setState({ checked: isChecked });
        const LABELS = document.querySelectorAll('label');

        LABELS.forEach((item) => {
          if (item.innerText === ingredient) {
            item.classList.add('markedIngredient');
          }
        });
      }
    }
    // this.isAllChecked();
    // const INPUTS = document.querySelectorAll('input');
    // console.log(INPUTS[0].checked);
  }

  render() {
    const { ingredient, index } = this.props;
    const { checked } = this.state;
    return (
      <div>
        <label htmlFor={ ingredient } data-testid={ `${index}-ingredient-step` }>
          <input
            id={ ingredient }
            name={ ingredient }
            type="checkbox"
            onChange={ this.inputChange }
            checked={ checked }
          />
          { ingredient }
        </label>
      </div>
    );
  }
}

InputIngredient.propTypes = {
  ingredient: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
  mealId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  finish: PropTypes.func.isRequired,
};

export default InputIngredient;
