import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import Profile from './pages/Profile';
import favoriteRecipes from './pages/favoriteRecipes';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/favorite-recipes" component={ favoriteRecipes } />
      </Switch>
    </div>
  );
}

export default App;
