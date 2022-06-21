import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaDeReceitas from './Components/TelaDeReceitas';

function App() {
  return (
    <div>
      <TelaDeReceitas />
      <Switch>
        <Route exact path="/foods" component={ TelaDeReceitas } />
      </Switch>
    </div>
  );
}

export default App;
