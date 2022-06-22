import React, { Component } from 'react';
import Header from './Header';
import Footer from './footer/Footer';
import DrinksCard from './DrinksCard';
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
      initialDrinks: [],
      drinksArr: [],
      categoryArr: [],
      category: '',

    };
  }

  filterAll = () => {
    const { initialDrinks } = this.state;
    this.setState({ drinksArr: [...initialDrinks] });
  };

    componentDidMount = async () => {
      const drinkValidator = await requestDrinks();
      const categoryValidator = await requestCategoryDrinks();
      const INDEX_DRINK = 11;
      const INDEX_CATEGORY = 4;
      this.setState({
        drinksArr: drinkValidator.drinks.filter((_drink, index) => index <= INDEX_DRINK),
        categoryArr: categoryValidator.drinks
          .filter((_category, index) => index <= INDEX_CATEGORY),
      }, () => {
        const { drinksArr } = this.state;
        console.log(drinksArr);
        this.setState({
          initialDrinks: [...drinksArr],
        });
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
            {drinksArr.map((item, index) => (
              <DrinksCard
                key={ index }
                id={ item.idDrink }
                strDrinkThumb={ item.strDrinkThumb }
                strDrink={ item.strDrink }
                index={ index }
              />
            ))}
          </div>
          <Footer />
        </div>
      );
    }
}
