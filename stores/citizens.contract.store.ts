import { ADDRESSES, CITIZENS_LIST_PAGE_SIZE } from "../constants";

import { Citizen } from "../types/Citizen.types";
import { Ethereum } from "../types/ethereum.types";
import ProviderStore from "./provider.store";
import _map from "lodash/map";
import _range from "lodash/range";
import _size from "lodash/size";
import _slice from "lodash/slice";
import { citizenFactory } from "../factory/citizen.factory";
import citizensContractABI from "contracts/citizens.contract.json";
import { makeAutoObservable } from "mobx";

export default class CitizensContractStore {
  provider: Ethereum | null = null;
  constructor(provider: ProviderStore) {
    this.provider = provider;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  currentPage: number = 0;
  contract: any = null;
  citizens: Citizen[] = [];

  get totalCount(): number {
    return _size(this.citizens);
  }

  get paginationList() {
    return _range(Math.ceil(this.totalCount / CITIZENS_LIST_PAGE_SIZE));
  }
  get displayedPaginationList(): number[] {
    return _slice(
      this.paginationList,
      Math.max(this.currentPage - 3, 0),
      Math.min(this.currentPage + 3, this.paginationList.length - 1)
    );
  }
  get displayedCitizens(): Citizen[] {
    return _map(
      _slice(
        [...this.citizens],
        this.currentPage * CITIZENS_LIST_PAGE_SIZE,
        (this.currentPage + 1) * CITIZENS_LIST_PAGE_SIZE
      ),
      (citizen) => citizenFactory(citizen, this.provider?.web3)
    );
  }

  setPage(num: number) {
    this.currentPage = num;
  }

  init() {
    const Contract = this?.provider?.web3?.eth?.Contract;
    this.contract = new Contract(
      citizensContractABI,
      ADDRESSES.CITIZENS_CONTRACT_ROPSTEN
    );
  }

  async fetchCitizens() {
    if (this.contract) {
      this.citizens = await this.contract.getPastEvents("Citizen", {
        fromBlock: 0,
        toBlock: "latest",
      });
    }
  }
}
