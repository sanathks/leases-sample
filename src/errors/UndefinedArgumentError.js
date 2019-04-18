export default class UndefinedArgumentError extends Error {
    constructor(argumentName) {
        super(`Argument "${argumentName}" should be defined`);
    }
}
