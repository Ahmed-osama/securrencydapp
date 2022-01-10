import { API_STATE } from "../constants";
import RootStore from "../stores/index.store";
import { ApiState } from "../types/index.types";

let store: RootStore | null = null;
export const initStore = () => {
  if (!store) {
    store = new RootStore();
    (<any>global).store = store;
  }
  return store;
};

export const isLoading = (apiState: ApiState) => apiState === API_STATE.LOADING;
export const isFailed = (apiState: ApiState) => apiState === API_STATE.FAILED;
export const isInitial = (apiState: ApiState) => apiState === API_STATE.INITIAL;
export const isSuccess = (apiState: ApiState) => apiState === API_STATE.SUCCESS;
