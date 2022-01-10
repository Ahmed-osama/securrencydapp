import _head from "lodash/head";
import _isUndefined from "lodash/isUndefined";
import { makeAutoObservable } from "mobx";
import Web3 from "web3";
import { ETHEREUM } from "../constants";
export default class ProviderStore {
  provider: any;
  constructor() {
    this.provider = (<any>global)?.ethereum;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  accounts: any = null;

  get hasProvider(): boolean {
    return !_isUndefined(this.provider);
  }

  get web3(): Web3 | null {
    return this.hasProvider ? new Web3(this.provider) : null;
  }

  get currentAccount(): string | undefined {
    return _head(this.accounts);
  }
  get isConnected(): boolean {
    return !!this.currentAccount;
  }

  setAccounts(accounts: any[]) {
    this.accounts = accounts;
  }
  async promptWalletSignIn(this: ProviderStore) {
    try {
      if (!this.hasProvider) throw new Error("client does not have Metamask");
      const accounts = await this.provider.request({
        method: ETHEREUM.REQUEST_ACCOUNT,
      });
      this.setAccounts(accounts);
    } catch (err) {
      console.error(err);
    }
  }
}
