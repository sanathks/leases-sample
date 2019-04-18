import React, { Component } from 'react';
import {register as registerServices} from './config/services';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import asyncComponent from "./components/AsyncComponent";

let serviceManager = registerServices();

const store = configureStore(serviceManager);

const AsyncLeaseListPage = asyncComponent(() => import("./containers/LeaseListPage"));
const AsyncLeaseDetailsPage= asyncComponent(() => import("./containers/LeaseDetailsPage"));

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <AppLayout>
                        <Route exact path='/' component={AsyncLeaseListPage}/>
                        <Route exact path='/leases/:id' component={AsyncLeaseDetailsPage}/>
                    </AppLayout>
                </Switch>
            </Router>
        </Provider>
    );
  }
}

export default App;
