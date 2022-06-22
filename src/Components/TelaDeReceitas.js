import React, { Component } from 'react';
import '../Style/TelaDeReceitas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestFoods, { requestCategorys, requestEndPoint } from '../sevices/RequestAPI';

export default class TelaDeReceitas extends Component {
  constructor() {
    super();
    this.state = {
      foodsArr: [],
      categoryArr: [],
      category: '',

    };
  }

    componentDidMount = async () => {
      const foodValidator = await requestFoods();
      const categoryValidator = await requestCategorys();
      const INDEX_FOOD = 11;
      const INDEX_CATEGORY = 4;
      this.setState({
        foodsArr: foodValidator.meals.filter((_food, index) => index <= INDEX_FOOD),
        categoryArr: categoryValidator.meals
          .filter((_category, index) => index <= INDEX_CATEGORY),
      });
    }

    handleClick = async ({ target }) => {
      const NUMBER = 11;
      const comidas = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
      const { value } = target;
      const { category } = this.state;
      const foodValidator = await requestFoods();

      if (value !== category) {
        this.setState({
          category: value,
        });
        comidas.forEach(async (item) => {
          const API = await requestEndPoint(item);
          if (value === item) {
            return this.setState(() => ({
              foodsArr: (API.meals
                .filter((_food, index) => index <= NUMBER)),
            }));
          }
        });
      } else {
        this.setState({
          foodsArr: foodValidator.meals.filter((_food, index) => index <= NUMBER),
        });
      }
    };

    render() {
      const { foodsArr, categoryArr } = this.state;
      return (
        <div>
          {categoryArr.map((category, index) => (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              type="button"
              id="button"
              key={ index }
              value={ category.strCategory }
              onClick={ this.handleClick }
            >
              {category.strCategory}
            </button>
          ))}
          <div className="teste">
            {foodsArr.map((item, index) => (
              <div
                className="testeDois"
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="card-img-top"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  width="200px"
                  data-testid={ `${index}-card-img` }
                />
                <h2
                  key={ item.strMeal }
                  data-testid={ `${index}-card-name"` }
                >
                  {item.strMeal}

                </h2>
              </div>
            ))}
          </div>
        </div>
      );
    }
}
