import React, { Component } from 'react';
import Header from './Header';
import Footer from './footer/Footer';
import '../Style/TelaDeReceitas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import requestFoods, { requestCategorys, requestEndPoint } from '../services/RequestAPI';

export default class TelaDeReceitas extends Component {
  constructor() {
    super();
    this.state = {
      initialFoods: [],
      foodsArr: [],
      categoryArr: [],
      category: '',

    };
  }

  filterAll = () => {
    const { initialFoods } = this.state;
    this.setState({ foodsArr: [...initialFoods] });
  };

    componentDidMount = async () => {
      const foodValidator = await requestFoods();
      const categoryValidator = await requestCategorys();
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
          <Header />

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
                  data-testid={ `${index}-card-name` }
                >
                  {item.strMeal}

                </h2>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      );
    }
}
