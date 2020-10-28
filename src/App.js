import React, { useState, useEffect } from 'react';
import './css/App.css';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from './components/HomePage.js';
import BlankPageWithMessage from './components/BlankPageWithMessage.js';
import RecipePage from './components/RecipePage.js';
import ProfilePage from './components/ProfilePage.js';
import CollectionPage from './components/CollectionPage.js';
import AppName from './components/AppName.js';
import RecipeAPI from './components/RecipeAPI';

const LoggedUserContext = React.createContext();

const App = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    RecipeAPI.fetchUser().then(setUser);
  }, []);
  return (
    <LoggedUserContext.Provider value={user}>
      <Router>
        <AppName />
        <Switch>
          <Route exact path='/'>
            <HomePage />
          </Route>
          <Route exact path='/recipe/:id'>
            <RecipePage />
          </Route>
          <Route exact path='/collection/:userId'>
            <CollectionPage />
          </Route>
          <Route exact path='/profile/:userId'>
            <ProfilePage />
          </Route>
          <Route path='*'>
            <BlankPageWithMessage message='404 Page Not Found' />
          </Route>
        </Switch>
      </Router>
    </LoggedUserContext.Provider>
  );
};

export { App, LoggedUserContext };
