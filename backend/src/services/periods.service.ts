import {
  findAllPeriods,
  findPeriodByNumber,
} from "../repositories/periods.repo.js";

export async function getAllPeriods() {
  return await findAllPeriods();
}

export async function getPeriodByNumber(number: number) {
  return await findPeriodByNumber(number);
}
