import UnknownServiceError from "../errors/UnknownServiceError";
import UndefinedArgumentError from "../errors/UndefinedArgumentError";
import InvalidArgumentError from "../errors/InvalidArgumentError";
import RecursiveDependencyError from "../errors/RecursiveDependencyError";
import ServiceCreationError from "../errors/ServiceCreationError";

export default class ServiceManager {
    /**
     * @type {{}}
     * @private
     */
    _factories = {};

    /**
     * @type {{}}
     * @private
     */
    _instances = {};

    /**
     * @type {Array}
     * @private
     */
    _callStack = [];

    constructor() {
        Object.defineProperty(this, 'instances', {
            writable: false,
            enumerable: true,
            value: this._instances
        });

        Object.defineProperty(this, 'factories', {
            writable: false,
            enumerable: true,
            value: this._factories
        });
    }

    /**
     * Register a new service in the service manager
     * @param {string} name
     * @param {function} factory
     */
    register(name, factory) {
        if (name === undefined) {
            throw new InvalidArgumentError('name');
        }

        if (factory === undefined) {
            throw new InvalidArgumentError('factory');
        }

        this._factories[name] = factory;
        this._instances[name] = undefined;
    }

    /**
     * Instantiate the requested service.
     * @param name
     * @return {*}
     */
    _instantiate(name) {
        if (this._factories[name] === undefined) {
            throw new UnknownServiceError(name);
        }

        if (typeof this._factories[name] !== 'function') {
            return this._factories[name];
        }

        if (!this._isSafeToInvoke(name)) {
            throw new RecursiveDependencyError(name);
        }

        this._callStack.push(name);
        let instance = this._factories[name](this);

        if (instance === undefined) {
            throw new ServiceCreationError(name);
        }

        this._instances[name] = instance;

        this._callStack = [];

        return this._instances[name];
    }


    _isSafeToInvoke(name) {
        return this._callStack.indexOf(name) === -1;
    }

    /**
     *
     * @param {string} name
     * @return {*}
     */
    get(name) {
        if (name === undefined) {
            throw new UndefinedArgumentError('name');
        }

        return this._instances[name] || this._instantiate(name);
    }
}
