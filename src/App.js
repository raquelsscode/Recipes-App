import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TelaDeReceitas from './Components/TelaDeReceitas';
import Login from './Components/Login';
// xablau enorme rs
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/foods" component={ TelaDeReceitas } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
