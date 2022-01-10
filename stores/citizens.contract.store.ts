import ABI from "contracts/citizens.contract.json";
import { Ethereum } from "../types/ethereum";
import { observable } from "mobx";

export default class Citizens {
  constructor(provider: Ethereum) {
    this.provider = provider;
  }

  @observable provider: Ethereum | null = null;
}
