import React from "react";
import ReactDOM from "react-dom";
import { store, history } from './store/index';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import "./assets/css/style.css";

import registerServiceWorker from "./registerServiceWorker";
import withAuthentication from './components/Session/withAuthentication';
import { withRouter } from 'react-router-dom';

import App from './components/App/index';

const MyComponent = withRouter(withAuthentication(App));

ReactDOM.render(
   <Provider store={store}>
    <ConnectedRouter history={history}>
        <MyComponent />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();