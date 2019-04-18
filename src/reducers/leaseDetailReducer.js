import {
    FETCH_LEASE_DETAILS_ERROR,
    FETCH_LEASE_DETAILS_REQUEST,
    FETCH_LEASE_DETAILS_SUCCESS, INIT_LEASE_DETAILS_STORE
} from "../actions/leaseDetails";

const  initialState = {
    isLoading: false,
    err: null,
    data: null
};

const fetchLeaseDetailRequest = (state) => {
    return {
        ...state,
        isLoading: true
    };
};

const fetchLeaseDetailSuccess = (state, {lease}) => {
    return {
        ...state,
        isLoading: false,
        data: {...lease},
    };
};

const fetchLeaseDetailError = (state, {err}) => {
    return {
        ...state,
        isLoading: false,
       err
    };
};

export default function leaseDetail(state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_LEASE_DETAILS_REQUEST:
            return fetchLeaseDetailRequest(state);
        case FETCH_LEASE_DETAILS_SUCCESS:
            return fetchLeaseDetailSuccess(state, payload);
        case FETCH_LEASE_DETAILS_ERROR:
            return fetchLeaseDetailError(state, payload);
        case INIT_LEASE_DETAILS_STORE:
            return initialState;

        default:
            return state;
    }
}
