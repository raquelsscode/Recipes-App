import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './pages/Profile';
import RecipesProvider from './context/RecipesProvider';
import favoriteRecipes from './pages/favoriteRecipes';
import TelaDeReceitas from './Components/TelaDeReceitas';
import TelaDeBebidas from './Components/TelaDeBebidas';
import DetailsFoods from './pages/DetailsFoods';
import DetailsDrinks from './pages/DetailsDrinks';
import ProgressoComida from './pages/ProgressFood';
import ProgressoBebida from './pages/ProgressDrink';

function App() {
  return (
    <Router>
      <RecipesProvider>
        <Switch>
          <Route exact path="/foods" component={ TelaDeReceitas } />
          <Route exact path="/" component={ Login } />
          <Route exact path="/drinks" component={ TelaDeBebidas } />
          <Route exact path="/foods/:id/in-progress" component={ ProgressoComida } />
          <Route exact path="/drinks/:id/in-progress" component={ ProgressoBebida } />
          <Route path="/foods/:id" component={ DetailsFoods } />
          <Route path="/drinks/:id" component={ DetailsDrinks } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/favorite-recipes" component={ favoriteRecipes } />
        </Switch>
      </RecipesProvider>
    </Router>
  );
}

export default App;
