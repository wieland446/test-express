import {
  createUser,
  findUserById,
  findAllUsers,
} from "../repositories/user.repo.js";
import {
  UserNotFoundError,
  InvalidUserDataError,
} from "../middlewares/handleUserErrors.js";

export async function registerUser(username: string) {
  if (username.length < 3) {
    throw new InvalidUserDataError(username);
  }
  return createUser(username);
}

export async function getUserById(id: number) {
  const user = await findUserById(id);
  if (!user) {
    throw new UserNotFoundError(String(id));
  }
  return user;
}

export async function getAllUsers() {
  return await findAllUsers();
}
