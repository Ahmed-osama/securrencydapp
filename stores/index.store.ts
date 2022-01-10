import CitizensContractStore from "./citizens.contract.store";
import ProviderStore from "./provider.store";
import { makeAutoObservable } from "mobx";

export default class RootStore {
  provider: ProviderStore;
  citizens: CitizensContractStore;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.provider = new ProviderStore();
    this.citizens = new CitizensContractStore(this.provider);
  }
}
