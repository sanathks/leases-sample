import {combineReducers} from 'redux';
import leases from './leaseReducer';
import leaseDetail from './leaseDetailReducer';

const rootReducer = combineReducers({
    leases,
    leaseDetail
});

export default rootReducer;
