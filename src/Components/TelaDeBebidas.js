import React, { Component } from 'react';
import Header from './Header';
import Footer from './footer/Footer';
import '../Style/TelaDeReceitas.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import
{ requestDrinks,
  requestCategoryDrinks,
  requestPointDrinks } from '../services/RequestAPI';

export default class TelaDeBebidas extends Component {
  constructor() {
    super();
    this.state = {
      drinksArr: [],
      categoryArr: [],
      category: '',

    };
  }

    componentDidMount = async () => {
      const drinkValidator = await requestDrinks();
      const categoryValidator = await requestCategoryDrinks();
      const INDEX_DRINK = 11;
      const INDEX_CATEGORY = 4;
      this.setState({
        drinksArr: drinkValidator.drinks.filter((_drink, index) => index <= INDEX_DRINK),
        categoryArr: categoryValidator.drinks
          .filter((_category, index) => index <= INDEX_CATEGORY),
      });
    }

    handleClick = async ({ target }) => {
      const NUMBER = 11;
      const { categoryArr, category } = this.state;
      const bebidas = await categoryArr.map((item) => item.strCategory);
      const { value } = target;
      const drinkValidator = await requestDrinks();

      if (value !== category) {
        this.setState({
          category: value,
        });
        bebidas.forEach(async (item) => {
          const drinks = await requestPointDrinks(item);

          if (value === item) {
            return this.setState(() => ({
              drinksArr: (drinks.drinks
                .filter((_drink, index) => index <= NUMBER)),
            }));
          }
        });
      } else {
        this.setState({
          drinksArr: drinkValidator.drinks.filter((_drink, index) => index <= NUMBER),
        });
      }
    };

    render() {
      const { drinksArr, categoryArr } = this.state;
      console.log(categoryArr);
      return (
        <div>
          <Header />
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
            {drinksArr.map((item, index) => (
              <div
                className="testeDois"
                key={ index }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="card-img-top"
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                  width="200px"
                  data-testid={ `${index}-card-img` }
                />
                <h2
                  key={ item.strDrink }
                  data-testid={ `${index}-card-name` }
                >
                  {item.strDrink}

                </h2>
              </div>
            ))}
          </div>
          <Footer />
        </div>
      );
    }
}
