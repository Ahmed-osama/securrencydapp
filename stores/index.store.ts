import ProviderStore from "./provider.store";

export default class RootStore {
  provider: ProviderStore;
  constructor() {
    this.provider = new ProviderStore();
  }
}
