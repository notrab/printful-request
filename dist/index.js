"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.PrintfulClient = void 0;
require("cross-fetch/polyfill");
class PrintfulClient {
    constructor(token, options = {}) {
        if (!token)
            throw new Error("No API key provided");
        const { headers } = options;
        this.options = Object.assign({ baseUrl: "https://api.printful.com" }, options);
        this.headers = Object.assign({ "Content-Type": "application/json", Authorization: `Bearer ${token}` }, headers);
    }
    request({ method, endpoint, data, params = {}, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const { baseUrl } = this.options;
            const headers = this.headers;
            const queryString = Object.keys(params).length
                ? `?${Object.keys(params)
                    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
                    .join("&")}`
                : "";
            const url = `${baseUrl}/${endpoint}${queryString}`;
            const response = yield fetch(url, Object.assign(Object.assign({ headers }, (method && { method })), (data && { body: JSON.stringify(data) })));
            const json = yield response.json();
            if (!response.ok)
                throw json;
            return json;
        });
    }
    get(endpoint, params) {
        return this.request({ endpoint, params });
    }
    post(endpoint, data) {
        return this.request({
            method: "POST",
            endpoint,
            data,
        });
    }
    put(endpoint, data) {
        return this.request({
            method: "PUT",
            endpoint,
            data,
        });
    }
    delete(endpoint) {
        return this.request({
            method: "DELETE",
            endpoint,
        });
    }
}
exports.PrintfulClient = PrintfulClient;
function request(endpoint, _a) {
    var { token } = _a, rest = __rest(_a, ["token"]);
    return __awaiter(this, void 0, void 0, function* () {
        const client = new PrintfulClient(token);
        return client.request(Object.assign({ endpoint }, rest));
    });
}
exports.request = request;
