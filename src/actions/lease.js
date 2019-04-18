export const PREFIX = '@@lease/';


export const FETCH_LEASE_REQUEST = `${PREFIX}FETCH_LEASE_REQUEST`;
export const FETCH_LEASE_SUCCESS = `${PREFIX}FETCH_LEASE_SUCCESS`;
export const FETCH_LEASE_ERROR = `${PREFIX}FETCH_LEASE_ERROR`;

export const INIT_LEASE_STORE = `${PREFIX}INIT_LEASE_STORE`;


/********************************************
 *  Fetch leases
 *******************************************/
const fetchLeaseRequest = () => {
    return {
        type: FETCH_LEASE_REQUEST
    };
};

const fetchLeaseError = (err) => {
    return {
        type: FETCH_LEASE_ERROR,
        payload: {
            err
        }
    };
};

const fetchLeaseSuccess = (leases) => {
    return {
        type: FETCH_LEASE_SUCCESS,
        payload: {
            leases
        }
    };
};


export const fetchLeaseAsync = () => {
    return (dispatch, getState, serviceManager) => {
        dispatch(fetchLeaseRequest());

        let leaseService = serviceManager.get('LeaseService');

        return leaseService
            .get()
            .then((leases) => {
                dispatch(fetchLeaseSuccess(leases));
            })
            .catch((err) => {
                dispatch(fetchLeaseError(err));
            });
    };
};

/********************************************
 *  Reset leases store
 *******************************************/
export const initLeaseStore = () => {
    return {
        type: INIT_LEASE_STORE
    };
};
