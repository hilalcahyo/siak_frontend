import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store, { history } from "./Redux/Store";
import './index.css';
import App from './App';
import AboutPage from './Pages/About/About'
import LoginPage from './Pages/Login/Login'
import registerServiceWorker from './registerServiceWorker';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { Route } from 'react-router'
ReactDOM.render(
<Provider store={store}>
<ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App}/>
        <Route exact path="/login" component={LoginPage}/>
        <Route path="/about" component={AboutPage}/>
      </div>
    </ConnectedRouter>
  </Provider>, 
document.getElementById('root'));
registerServiceWorker();
