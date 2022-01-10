import { ADDRESSES, API_STATE, CITIZENS_LIST_PAGE_SIZE } from "../constants";

import { ApiState } from "../types/index.types";
import { Citizen } from "../types/Citizen.types";
import { Ethereum } from "../types/ethereum.types";
import ProviderStore from "./provider.store";
import _last from "lodash/last";
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
  addCitizenState: ApiState = API_STATE.INITIAL;

  get totalCount(): number {
    return _size(this.citizens);
  }
  get hasCitizens(): boolean {
    return this.totalCount > 0;
  }

  get paginationList(): number[] {
    return _range(Math.ceil(this.totalCount / CITIZENS_LIST_PAGE_SIZE));
  }
  get lastPage(): number {
    return _last(this.paginationList) || 0;
  }

  get displayedPaginationList(): number[] {
    return _slice(
      this.paginationList,
      Math.max(this.currentPage - 2, 0),
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
      (citizen) => citizenFactory(citizen)
    );
  }

  toTheBeginning() {
    this.currentPage = 0;
  }
  toTheEnd() {
    this.currentPage = this.lastPage;
  }
  nextPage() {
    this.currentPage = Math.min(this.currentPage + 1, this.lastPage);
  }
  prevPage() {
    this.currentPage = Math.max(this.currentPage - 1, 0);
  }
  setPage(num: number) {
    this.currentPage = num;
  }

  async addCitizen({
    age,
    city,
    name,
    someNote,
    sender,
    successHandler,
    errorHandler,
  }: {
    age: number;
    city: string;
    name: string;
    someNote: string;
    sender: string;
    successHandler: (data: any) => void;
    errorHandler: (err: any) => void;
  }) {
    try {
      this.addCitizenState = API_STATE.LOADING;
      await this.contract.methods
        .addCitizen(age, city, name, someNote)
        .send({ from: sender })
        .then(successHandler);
      this.addCitizenState = API_STATE.SUCCESS;
    } catch (err) {
      errorHandler(err);
      this.addCitizenState = API_STATE.FAILED;
    }
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
