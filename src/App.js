import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Components/Login';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaDeReceitas from './Components/TelaDeReceitas';
import TelaDeReceitaEmProgresso
from './Components/receitaEmProgresso/TelaDeReceitaEmProgresso';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/foods" component={ TelaDeReceitas } />
        {/* <Route
          exact
          path="/foods/:id/in-progress"
          component={ TelaDeReceitaEmProgresso }
        /> */}
        <Route exact path="/" component={ Login } />
        <Route exact path="/receitaemprogresso" component={ TelaDeReceitaEmProgresso } />
      </Switch>
    </div>
  );
}

export default App;
