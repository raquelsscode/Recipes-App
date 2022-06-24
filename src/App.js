import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './pages/Profile';
import favoriteRecipes from './pages/favoriteRecipes';
import TelaDeReceitas from './Components/TelaDeReceitas';
import TelaDeBebidas from './Components/TelaDeBebidas';
import Receita from './pages/Receita';
import Bebidas from './pages/Bebidas';
import ProgressFood from './pages/ProgressFood';

function App() {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/foods/:id/in-progress"
          component={ ProgressFood }
        />
        <Route exact path="/foods" component={ TelaDeReceitas } />
        <Route exact path="/foods/:id" component={ Receita } />
        <Route exact path="/drinks/:id" component={ Bebidas } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/drinks" component={ TelaDeBebidas } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ favoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
