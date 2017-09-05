import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  MyDetails,
  AddPhotos
} from './containers';
import {
  NotFound
} from './components';

export default function (store) {
  const replaceToDashboard = (nextState, replace, callback) => {
    if (location.pathname === '/') {
      replace('/my-details');
      callback();
    }
    callback();
  };

  return (
    <Route path="/" component={App} onEnter={replaceToDashboard}>
      <Route path="my-details" component={MyDetails} />
      <Route path="photos" component={AddPhotos} />

      <Route path="*" component={NotFound} />
    </Route>
  );
}
