import React from 'react';
import './css/App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage.js';
import NoMatch from './components/NoMatch.js';
import RecipePage from './components/RecipePage.js';
import ProfilePage from './components/ProfilePage.js';
import AppName from './components/AppName.js';

const App = () => (
  <Router>
    <AppName />
    <Switch>
      <Route exact path='/'>
        <HomePage />
      </Route>
      <Route exact path='/recipe/:id'>
        <RecipePage />
      </Route>
      <Route exact path='/profile/:username'>
        <ProfilePage />
      </Route>
      <Route path='*'>
        <NoMatch />
      </Route>
    </Switch>
  </Router>
);

export default App;
