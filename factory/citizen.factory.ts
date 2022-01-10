import { Citizen } from "../types/Citizen.types";
import Web3 from "web3";
import _get from "lodash/get";
const web3 = new Web3();
export function citizenFactory(citizen: any): Citizen {
  const city = _get(citizen, "returnValues.city");
  return {
    id: _get(citizen, "returnValues.id"),
    age: _get(citizen, "returnValues.age"),
    city: city && web3 ? web3.utils.hexToAscii(city) : "",
    name: _get(citizen, "returnValues.name"),
  };
}
