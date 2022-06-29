import React from 'react';
import PropTypes from 'prop-types';
import requestFoods, { requestCategorys } from '../services/RequestAPI';

class ExploreByNationalitesFoods extends React.Component {
  constructor() {
    super();
    this.state = {
      nationaliteFoods: [],
      nationaliteFilter: '',
      filterFoods: [],
      filterDisabled: false,
      recipesFoods: [],
      setCategory: [],
    };
  }

  componentDidMount() {
    this.getFoodNationality();
    this.getFoodsRecipes();
    this.getFoodCategory();
  }

  getFoodNationalityCards = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();
    return data.meals;
  }

  getFoodByArea = async (name) => {
    if (name === 'All') {
      return this.getFoodNationalityCards();
    }
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`);
    const data = await response.json();
    return data.meals;
  }

  getFoodNationality = async () => {
    const data = await this.getFoodNationalityCards();
    this.setState({
      nationaliteFoods: data.slice(),
    });
    return data.slice();
  }

   handleChange = async ({ target: { value } }) => {
     const maxRecipes = 12;
     const { recipesFoods } = this.state;
     this.setState({
       nationaliteFilter: {
         name: value,
       },
     });
     const data = await this.getFoodByArea(value) || [];
     this.setState({
       filterFoods: data.slice(0, maxRecipes),
     });
     if (data.length === 0) {
       this.setState({
         filterDisabled: false,
         filterFoods: {
           recipesFoods,
         },

       });
     }
     this.setState({
       filterDisabled: true,
     });
     if (value === 'All') {
       this.setState({
         filterDisabled: false,
       });
     }
     return data.slice(0, maxRecipes);
   }

   getFoodsRecipes = async () => {
     const maxRecipes = 12;
     const data = await requestFoods();
     this.setState({
       recipesFoods: data.meals.slice(0, maxRecipes),
     });
     return data.meals.slice(0, maxRecipes);
   }

   getFoodCategory = async () => {
     const data = await requestCategorys();
     this.setState({
       setCategory: data.meals.slice(),
     });
     return data.meals.slice();
   }

   render() {
     const {
       nationaliteFoods,
       nationaliteFilter,
       setCategory,
       filterDisabled,
       filterFoods,
       recipesFoods } = this.state;
     const { history } = this.props;
     return (
       <form>
         <select
           data-testid="explore-by-nationality-dropdown"
           onChange={ this.handleChange }
         >
           <option>Selecione uma nacionalidade</option>
           <option data-testid="All-option">All</option>
           { nationaliteFoods.map((nationality, index) => (
             <option
               key={ index }
               data-testid={ `${nationality.strArea}-option` }
               value={ `${nationality.strArea}` }
             >
               { nationality.strArea }
             </option>
           )) }
         </select>
         <select
           onChange={ this.handleChange }
         >
           <option>Selecione uma categoria</option>
           { setCategory.map((categories, i) => (
             <option
               key={ i }
               data-testid={ `${categories.strCategory}-option` }
               value={ `${categories.strCategory}` }
             >
               { categories.strCategory }
             </option>
           )) }
         </select>

         { filterDisabled === false && recipesFoods !== undefined
            && recipesFoods.map((recipeFood, index) => (
              <div key={ index } data-testid={ `${index}-recipe-card` }>
                <button
                  type="button"
                  onClick={ () => { history.push(`/foods/${recipeFood.idMeal}`); } }
                >

                  <img
                    data-testid={ `${index}-card-img` }
                    alt={ recipeFood.strMeal }
                    src={ recipeFood.strMealThumb }
                  />
                  {console.log(recipeFood.strMealThumb)}
                  {console.log(index)}

                  <p data-testid={ `${index}-card-name` }>
                    {recipeFood.strMeal}
                  </p>
                </button>
              </div>
            )) }

         {nationaliteFilter.name !== undefined
            && filterDisabled && filterFoods.length > 0
            && filterFoods.map((filterFood, ind) => (
              <div key={ ind } data-testid={ `${ind}-recipe-card` }>
                <img
                  src={ filterFood.strMealThumb }
                  alt={ filterFood.strMeal }
                  data-testid={ `${ind}-card-img` }
                />

                <p data-testid={ `${ind}-card-name` }>
                  {filterFood.strMeal}
                </p>
              </div>
            ))}

       </form>
     );
   }
}

ExploreByNationalitesFoods.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ExploreByNationalitesFoods;
