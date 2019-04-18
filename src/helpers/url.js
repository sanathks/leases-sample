import {entries} from "../kernel/iterators";

/**
 *
 * @param {object} obj
 * @param {string} prefix
 * @return {string}
 */
export const serialize = (obj, prefix) => {
    var str = [];
    for (let [param, value] of entries(obj)) {

        let key = prefix ? `${prefix}[${param}]` : param;

        if (value !== null && typeof value === "object") {
            str.push(serialize(value, key));
            continue;
        }

        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return str.join("&");
};
