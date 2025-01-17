"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const default_credential_1 = __importDefault(require("./default_credential"));
const config_1 = __importDefault(require("./config"));
class BearerTokenCredential extends default_credential_1.default {
    constructor(bearerToken) {
        if (!bearerToken) {
            throw new Error('Missing required bearerToken option in config for bearer');
        }
        const conf = new config_1.default({
            type: 'bearer'
        });
        super(conf);
        this.bearerToken = bearerToken;
    }
}
exports.default = BearerTokenCredential;
//# sourceMappingURL=bearer_token_credential.js.map