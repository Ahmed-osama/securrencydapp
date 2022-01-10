export const ETHEREUM = {
  REQUEST_ACCOUNT: "eth_requestAccounts",
  ON_ACCOUNT_CHANGED: "accountsChanged",
  ON_DISCONNECT: "disconnect",
  ON_CONNECT: "connect",
};

export const ADDRESSES = {
  CITIZENS_CONTRACT_ROPSTEN: "0xb5842e2384f5b6f1dbec5e130c75e82d3803c3d3",
};

export const API_STATE = {
  LOADING: "loading" as const,
  SUCCESS: "success" as const,
  FAILED: "failed" as const,
  INITIAL: "initial" as const,
};
export const CITIZENS_LIST_PAGE_SIZE = 5;
