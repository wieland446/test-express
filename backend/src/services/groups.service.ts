import {
  findAllGroups,
  findGroupByNumber,
} from "../repositories/groups.repo.js";

export async function getAllGroups() {
  return await findAllGroups();
}

export async function getGroupByNumber(number: number) {
  return await findGroupByNumber(number);
}
