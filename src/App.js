import React from 'react';
import './css/App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage.js';

const App = () => (
  <Router>
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
    </Switch>
  </Router>
);

export default App;
