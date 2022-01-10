import ABI from "contracts/citizens.contract.json";
import { Ethereum } from "../types/ethereum";
import { makeAutoObservable } from "mobx";

export default class Citizens {
  constructor(provider: Ethereum) {
    this.provider = provider;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  provider: Ethereum | null = null;
}
