import { computed, action, observable } from "mobx";
import _isUndefined from "lodash/isUndefined";
import _head from "lodash/head";
import Web3 from "web3";
import { ETHEREUM } from "../constants";
export default class ProviderStore {
  provider: any;
  constructor() {
    this.provider = (<any>global)?.ethereum;
  }
  @observable accounts: any = null;

  @computed get hasProvider() {
    return !_isUndefined(this.provider);
  }

  @computed get web3() {
    return this.hasProvider ? new Web3(this.provider) : null;
  }

  @computed get currentAccount() {
    return _head(this.accounts);
  }

  @action async setAccounts(accounts: any[]) {
    this.accounts = accounts;
  }
  @action async promptWalletSignIn() {
    try {
      if (!this.hasProvider) throw new Error("client does not have Metamask");
      const accounts = await this.provider.request({
        method: ETHEREUM.REQUEST_ACCOUNT,
      });

      this.setAccounts(accounts);
    } catch (err) {}
  }
}
