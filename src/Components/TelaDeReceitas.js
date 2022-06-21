import React, { Component } from 'react';
import '../Style/TelaDeReceitas.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class TelaDeReceitas extends Component {
  constructor() {
    super();
    this.state = {
      initialFoods: [],
      foodsArr: [],
      categoryArr: [],

    };
  }

    requestFoods = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const data = await fetch(URL);
      const response = await data.json();
      return response;
    };

    requestCategorys = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const data = await fetch(URL);
      const response = await data.json();
      return response;
    };

    filterAll = () => {
      const { initialFoods } = this.state;
      this.setState({
        foodsArr: [...initialFoods],
      });
    };

    componentDidMount = async () => {
      const foodValidator = await this.requestFoods();
      const categoryValidator = await this.requestCategorys();
      const INDEX_FOOD = 11;
      const INDEX_CATEGORY = 4;
      this.setState({
        foodsArr: foodValidator.meals.filter((_food, index) => index <= INDEX_FOOD),
        categoryArr: categoryValidator.meals
          .filter((_category, index) => index <= INDEX_CATEGORY),
      }, () => {
        const { foodsArr } = this.state;
        this.setState({
          initialFoods: [...foodsArr],
        });
      });
    }

    render() {
      const { foodsArr, categoryArr, initialFoods } = this.state;
      console.log(initialFoods);
      return (
        <div>
          <button
            data-testid="All-category-filter"
            type="button"
            onClick={ this.filterAll }
          >
            All
          </button>
          {categoryArr.map((category, index) => (
            <button
              data-testid={ `${category.strCategory}-category-filter` }
              type="button"
              key={ index }
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
