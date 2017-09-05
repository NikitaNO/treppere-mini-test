import React from 'react';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

import getRoutes from './routes';
import store from './redux/configureStore';
import config from './config';
import locales from 'antd/lib/locale-provider/en_US';

const history = syncHistoryWithStore(browserHistory, store);

// react-apollo configuration
const networkInterface = createNetworkInterface({
  uri: config.graphql.api
});
const client = new ApolloClient({
  networkInterface: networkInterface
});

render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <LocaleProvider locale={locales}>
        <Router history={history}>
          {getRoutes(store)}
        </Router>
      </LocaleProvider>
    </ApolloProvider>
  </Provider>,
  document.getElementById('main-wrapper')
);
