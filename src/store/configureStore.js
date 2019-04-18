import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension";
import {register as registerServices} from '../config/services';

export default function configureStore() {
   const  serviceManager = registerServices();
    return createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(
                thunk.withExtraArgument(serviceManager),
            )
        )
    );
}
