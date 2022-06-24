import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './pages/Profile';
import RecipesProvider from './context/RecipesProvider';
import favoriteRecipes from './pages/favoriteRecipes';
import TelaDeReceitas from './Components/TelaDeReceitas';
import TelaDeBebidas from './Components/TelaDeBebidas';
import Explore from './Components/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreIngredients from './Components/ExploreIngredients';
import DetailsFoods from './pages/DetailsFoods';
import DetailsDrinks from './pages/DetailsDrinks';
import ProgressoComida from './pages/ProgressFood';
import ProgressoBebida from './pages/ProgressDrink';
import ExploreIngredientsDrinks from './pages/ExploreIngredientsDrinks';

function App() {
  return (
    <Router>
      <RecipesProvider>
        <Switch>
          <Route exact path="/foods" component={ TelaDeReceitas } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/drinks" component={ TelaDeBebidas } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/favorite-recipes" component={ favoriteRecipes } />
          <Route exact path="/explore" component={ Explore } />
          <Route exact path="/explore/foods" component={ ExploreFoods } />
          <Route exact path="/explore/drinks" component={ ExploreDrinks } />
          <Route
            exact
            path="/explore/foods/ingredients"
            component={ ExploreIngredients }
          />
          <Route path="/foods/:id" component={ DetailsFoods } />
          <Route path="/drinks/:id" component={ DetailsDrinks } />
          <Route exact path="/foods/:id/in-progress" component={ ProgressoComida } />
          <Route exact path="/drinks/:id/in-progress" component={ ProgressoBebida } />
          <Route
            exact
            path="/explore/drinks/ingredients"
            component={ ExploreIngredientsDrinks }
          />
        </Switch>
      </RecipesProvider>
    </Router>

  );
}
export default App;
