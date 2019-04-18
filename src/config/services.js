import ServiceManager from '../kernel/ServiceManager';
import ApiService from "../services/ApiService";
import LeaseService from "../services/LeaseService"
import config  from './config';

let serviceManagerInstance;

/**
 *
 * @param {ServiceManager} serviceManager
 * @return {ServiceManager}
 */
export const register = (serviceManager = new ServiceManager()) => {

    serviceManager.register('ApiService', () => {
        return new ApiService(config.API_URL);
    });

    serviceManager.register('LeaseService', (serviceManager) => {
        let api = serviceManager.get('ApiService');
        return new LeaseService(api);
    });

    serviceManagerInstance = serviceManager;
    return serviceManagerInstance;
};


export const getServiceManager = () => {
    return serviceManagerInstance;
};
