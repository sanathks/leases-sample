export const PREFIX = '@@lease-details/';


export const FETCH_LEASE_DETAILS_REQUEST = `${PREFIX}FETCH_LEASE_DETAILS_REQUEST`;
export const FETCH_LEASE_DETAILS_SUCCESS = `${PREFIX}FETCH_LEASE_DETAILS_SUCCESS`;
export const FETCH_LEASE_DETAILS_ERROR = `${PREFIX}FETCH_LEASE_DETAILS_ERROR`;

export const INIT_LEASE_DETAILS_STORE = `${PREFIX}INIT_LEASE_STORE`;


/********************************************
 *  Fetch lease details
 *******************************************/
const fetchLeaseRequest = () => {
    return {
        type: FETCH_LEASE_DETAILS_REQUEST
    };
};

const fetchLeaseError = (err) => {
    return {
        type: FETCH_LEASE_DETAILS_ERROR,
        payload: {
            err
        }
    };
};

const fetchLeaseSuccess = (lease) => {
    return {
        type: FETCH_LEASE_DETAILS_SUCCESS,
        payload: {
            lease
        }
    };
};


export const fetchLeaseDetailsAsync = (leaseId) => {
    return (dispatch, getState, serviceManager) => {
        dispatch(fetchLeaseRequest());

        let leaseService = serviceManager.get('LeaseService');

        return leaseService
            .getById(leaseId)
            .then((lease) => {
                dispatch(fetchLeaseSuccess(lease));
            })
            .catch((err) => {
                dispatch(fetchLeaseError(err));
            });
    };
};

/********************************************
 *  Reset leases store
 *******************************************/
export const initLeaseDetailsStore = () => {
    return {
        type: INIT_LEASE_DETAILS_STORE
    };
};
