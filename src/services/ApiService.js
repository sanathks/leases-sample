import merge from 'lodash/merge';
import {serialize} from "../helpers/url";
import ConnectionError from "../errors/ConnectionError";
import ServerError from "../errors/ServerError";

export default class ApiService {
    defaultOptions = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    };

    /**
     * @param {string} baseUrl
     */
    constructor(baseUrl) {
        this._baseUrl = this._formatApiEndpoint(baseUrl);
    }

    /**
     *
     * @param {string} baseUrl
     * @return {*|void|string}
     * @private
     */
    _formatApiEndpoint(baseUrl) {
        return baseUrl.replace(/\/$/, '');
    }

    /**
     * @param {string} endpoint
     * @param {object} query
     * @param {object} options
     * @return {Promise<Response>}
     */
    get(endpoint, query = {}, options = {}) {
        return this._fetch('GET', endpoint, {}, query, options);
    }

    /**
     *
     * @param {string} method
     * @param {string} endpoint
     * @param {string|object} body
     * @param {object} query
     * @param {object} options
     * @return {Promise<Response>}
     * @private
     */
    _fetch(method, endpoint, body = {}, query = {}, options = {}) {
        if (Object.keys(query).length > 0) {
            endpoint = `${endpoint}?${serialize(query)}`;
        }

        options = merge(
            {},
            this.defaultOptions,
            options,
            {
                method
            }
        );

        if (Object.keys(body).length > 0) {
            options.body = typeof body === 'object' ? JSON.stringify(body) : body;
        }

        return fetch(`${this._baseUrl}${endpoint}`, options)
            .catch((error) => {
                throw new ConnectionError(error);
            })
            .then((response) => {

                if (response.status >= 500) {
                    throw new ServerError(response);
                }

                if (response.status !== 200 && response.ok === true) {
                    return response;
                }

                return response.json();
            });
    }

}
