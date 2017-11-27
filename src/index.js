import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import store, { history } from "./Redux/Store";
import './index.css';
import registerServiceWorker from './registerServiceWorker';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router'

import SIAK_Main from './Pages/SIAK/Main/SIAK_Main'
import Form_General_Journal from './Pages/SIAK/Form_General_Journal/index'
import Form_Account from './Pages/SIAK/Form_Account/index'
import Form_Detail from './Pages/SIAK/Form_Keterangan/index'

import List_Account from './Pages/SIAK/List_Account/index'

ReactDOM.render(
  <Provider store={store}>
  <ConnectedRouter history={history}>
        <div>
          <Route exact path="/" component={SIAK_Main}/>
          <Route exact path='/form-general-journal' component={Form_General_Journal}/>
          <Route exact path='/form-account' component={Form_Account}/>
          <Route exact path='/list-account' component={List_Account}/>
          <Route exact path='/form-detail' component={Form_Detail}/>
        </div>
      </ConnectedRouter>
    </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
