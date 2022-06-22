import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaDeReceitas from './Components/TelaDeReceitas';
import TelaDeBebidas from './Components/TelaDeBebidas';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/foods" component={ TelaDeReceitas } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/drinks" component={ TelaDeBebidas } />
      </Switch>
    </div>
  );
}

export default App;
