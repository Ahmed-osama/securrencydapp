import ProviderStore from "./provider.store";
import { makeAutoObservable } from "mobx";

export default class RootStore {
  provider: ProviderStore;
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.provider = new ProviderStore();
  }
}
