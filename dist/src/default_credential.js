"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DefaultCredential {
    constructor(config) {
        this.accessKeyId = config.accessKeyId || '';
        this.accessKeySecret = config.accessKeySecret || '';
        this.securityToken = config.securityToken || '';
        this.bearerToken = config.bearerToken || '';
        this.type = config.type || '';
    }
    async getAccessKeyId() {
        return this.accessKeyId;
    }
    async getAccessKeySecret() {
        return this.accessKeySecret;
    }
    async getSecurityToken() {
        return this.securityToken;
    }
    getBearerToken() {
        return this.bearerToken;
    }
    getType() {
        return this.type;
    }
}
exports.default = DefaultCredential;
//# sourceMappingURL=default_credential.js.map