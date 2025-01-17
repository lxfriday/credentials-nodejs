"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const access_key_credential_1 = __importDefault(require("../access_key_credential"));
const sts_token_credential_1 = __importDefault(require("../sts_token_credential"));
const ecs_ram_role_credential_1 = __importDefault(require("../ecs_ram_role_credential"));
const ram_role_arn_credential_1 = __importDefault(require("../ram_role_arn_credential"));
const rsa_key_pair_credential_1 = __importDefault(require("../rsa_key_pair_credential"));
const bearer_token_credential_1 = __importDefault(require("../bearer_token_credential"));
const utils = __importStar(require("../util/utils"));
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
const DEFAULT_PATH = process.env.HOME + '/.alibabacloud/credentials';
exports.default = {
    getCredential(credentialName = 'default') {
        let fileContent = null;
        const credentialFile = process.env.ALIBABA_CLOUD_CREDENTIALS_FILE;
        if (credentialFile === undefined) {
            if (fs_1.default.existsSync(DEFAULT_PATH)) {
                const content = utils.parseFile(DEFAULT_PATH, true);
                if (content) {
                    fileContent = content;
                }
            }
        }
        else {
            if (credentialFile === null || credentialFile === '') {
                throw new Error('Environment variable credentialFile cannot be empty');
            }
            if (!fs_1.default.existsSync(credentialFile)) {
                throw new Error(`credentialFile ${credentialFile} cannot be empty`);
            }
            fileContent = utils.parseFile(credentialFile);
        }
        if (!fileContent) {
            return null;
        }
        const config = fileContent[credentialName] || {};
        if (!config.type) {
            throw new Error('Missing required type option in credentialFile');
        }
        switch (config.type) {
            case 'access_key':
                return new access_key_credential_1.default(config.access_key_id, config.access_key_secret);
            case 'sts':
                return new sts_token_credential_1.default(config.access_key_id, config.access_key_secret, config.security_token);
            case 'ecs_ram_role':
                return new ecs_ram_role_credential_1.default(config.role_name);
            case 'ram_role_arn': {
                const conf = new config_1.default({
                    roleArn: config.role_arn,
                    accessKeyId: config.access_key_id,
                    accessKeySecret: config.access_key_secret
                });
                return new ram_role_arn_credential_1.default(conf);
            }
            case 'rsa_key_pair':
                return new rsa_key_pair_credential_1.default(config.public_key_id, config.private_key_file);
            case 'bearer':
                return new bearer_token_credential_1.default(config.bearer_token);
            default:
                throw new Error('Invalid type option, support: access_key, sts, ecs_ram_role, ram_role_arn, rsa_key_pair');
        }
    }
};
//# sourceMappingURL=profile_credentials_provider.js.map