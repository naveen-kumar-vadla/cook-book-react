import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import RecipeAPI from './RecipeAPI.js';

const SignIn = () => {
  const [redirectUrl, setRedirectUrl] = useState(null);
  useEffect(() => {
    RecipeAPI.signIn().then(setRedirectUrl);
  }, []);
  if (redirectUrl == null) return <div>Loading...</div>;
  console.log('redirectUrl', redirectUrl);
  return (
    <Redirect
      to={{
        pathname: '/login',
        search: '?utm=your+face',
        state: { referrer: currentLocation },
      }}
    />
  );
};

export default SignIn;
