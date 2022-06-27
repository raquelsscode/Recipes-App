import React from 'react';
import PropTypes from 'prop-types';

class InputIngredient extends React.Component {
  constructor() {
    super();

    this.state = {
      checked: false,
      localstorage: [],
    };

    this.myRef = React.createRef();
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
    const localStorageItensObj = JSON
      .parse(localStorage.getItem('inProgressRecipes')) || { meals: {} };

    if (localStorageItensObj.meals[mealId]) {
      this.setState({ localstorage: localStorageItensObj.meals[mealId] }, () => {
        const { localstorage } = this.state;
        this.setState({
          checked: localstorage.some((item) => item === ingredient),
        });
      });
    }
    const node = this.myRef.current;
    // console.log(node);
    if (node.firstChild.checked) {
      node.classList.add('markedIngredient');
    }
  }

  render() {
    const { ingredient, index } = this.props;
    const { checked } = this.state;
    console.log(checked);
    return (
      <div>
        <label
          htmlFor={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          ref={ this.myRef }
        >
          <input
            id={ ingredient }
            name={ ingredient }
            type="checkbox"
            onChange={ this.inputChange }
            checked={ checked ? ingredient : false }
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
