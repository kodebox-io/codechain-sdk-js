import * as _ from "lodash";

import { KeyStore } from "./KeyStore";
import { CCKey } from "codechain-keystore";

export class LocalKeyStore implements KeyStore {
    cckey: CCKey;

    private constructor(cckey: CCKey) {
        this.cckey = cckey;
    }

    platform = {
        getKeyList: (): Promise<string[]> => {
            return this.cckey.platform.getKeys();
        },

        createKey: (params: { passphrase?: string } = {}): Promise<string> => {
            return this.cckey.platform.createKey(params);
        },

        removeKey: (params: { publicKey: string }): Promise<boolean> => {
            const { publicKey } = params;
            return this.cckey.platform.deleteKey({ publicKey });
        },

        sign: (params: { publicKey: string, message: string, passphrase?: string }): Promise<string> => {
            const { passphrase = "" } = params;
            return this.cckey.platform.sign({ ...params, passphrase });
        }
    };

    asset = {
        getKeyList: (): Promise<string[]> => {
            return this.cckey.asset.getKeys();
        },

        createKey: (params: { passphrase?: string } = {}): Promise<string> => {
            return this.cckey.asset.createKey(params);
        },

        removeKey: (params: { publicKey: string }): Promise<boolean> => {
            const { publicKey } = params;
            return this.cckey.asset.deleteKey({ publicKey });
        },

        sign: (params: { publicKey: string, message: string, passphrase?: string }): Promise<string> => {
            const { passphrase = "" } = params;
            return this.cckey.asset.sign({ ...params, passphrase });
        }
    };

    static async create(): Promise<KeyStore> {
        const cckey = await CCKey.create({});
        return new LocalKeyStore(cckey);
    }

    static async createForTest(): Promise<KeyStore> {
        const cckey = await CCKey.create({ useMemoryDB: true });
        return new LocalKeyStore(cckey);
    }

    mapping = {
        add: (params: { key: string; value: string; }): Promise<void> => {
            return this.cckey.mapping.add(params);
        },

        get: async (params: { key: string; }): Promise<string> => {
            const pk = await this.cckey.mapping.get(params);
            return pk as string;
        }
    };

    close() {
        return this.cckey.close();
    }
}
