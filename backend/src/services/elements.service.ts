import {
  findAllElements, findElementByName
} from "../repositories/elements.repo.js";  

export async function getAllElements() {
  return await findAllElements();
}

export async function getElementByName(name: string) {
  return await findElementByName(name);
}