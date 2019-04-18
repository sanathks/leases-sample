import {FETCH_LEASE_ERROR, FETCH_LEASE_REQUEST, FETCH_LEASE_SUCCESS, INIT_LEASE_STORE} from "../actions/lease";

const  initialState = {
    meta: {
        isLoading: false,
        err: null
    },
    list: []
};

const fetchLeasesRequest = (state) => {
    return {
        ...state,
        meta: {
            ...state.meta,
            isLoading: true
        }
    };
};

const fetchLeasesSuccess = (state, {leases}) => {

    return {
        ...state,
        meta: {
            ...state.meta,
            isLoading: false,
        },
        list: leases
    };
};

const fetchLeasesError = (state, {err}) => {
    return {
        ...state,
        meta: {
            ...state.meta,
            err
        }
    };
};

export default function leases(state = initialState, { type, payload }) {
    switch (type) {
        case FETCH_LEASE_REQUEST:
            return fetchLeasesRequest(state);
        case FETCH_LEASE_SUCCESS:
            return fetchLeasesSuccess(state, payload);
        case FETCH_LEASE_ERROR:
            return fetchLeasesError(state, payload);
        case INIT_LEASE_STORE:
            return initialState;

        default:
            return state;
    }
}
