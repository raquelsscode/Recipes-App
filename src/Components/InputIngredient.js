import React from 'react';
import PropTypes from 'prop-types';

class InputIngredient extends React.Component {
  constructor() {
    super();

    this.myRef = React.createRef();
  }

  componentDidMount = () => {
    const node = this.myRef.current;
    if (node.firstChild.checked) {
      node.classList.add('markedIngredient');
    }
  }

  render() {
    const { ingredient, index, handleInput, checked } = this.props;
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
            onChange={ handleInput }
            defaultChecked={ checked }
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
  index: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default InputIngredient;
