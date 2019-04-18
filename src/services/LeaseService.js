
export default class LeaseService {

    apiEndpoint = '/leases';

    /**
     * @param {ApiService} apiService
     */
    constructor(apiService) {
        this.api = apiService;
    }


    get() {
        return this.api.get(`${this.apiEndpoint}`).then((response) => {
            return response;
        });
    }

    getById(leaseId) {
        return this.api.get(`${this.apiEndpoint}/` + leaseId).then((response) => {
            return response;
        });
    }
}
