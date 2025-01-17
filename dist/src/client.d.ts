import ICredential from './icredential';
import Config from './config';
export { Config };
export default class Credential implements ICredential {
    credential: ICredential;
    constructor(config?: Config, runtime?: {
        [key: string]: any;
    });
    getAccessKeyId(): Promise<string>;
    getAccessKeySecret(): Promise<string>;
    getSecurityToken(): Promise<string>;
    getBearerToken(): string;
    getType(): string;
    private load;
}
