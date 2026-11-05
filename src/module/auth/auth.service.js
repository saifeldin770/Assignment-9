import { compare, hash } from "bcrypt";
import CryptoJS from "crypto-js";
import {
  ConflictException,
  NotFoundException,
} from "../../common/exceptions/app.exceptions.js";
import userModel from "../../DB/model/user.model.js";
import { createDoc, findOneDoc } from "../../DB/repo/repo.db.js";
import { model } from "mongoose";
import { compareHash, hashValue } from "../../common/security/hash.js";
import { HashToolEnum } from "../../common/enum/hash.enum.js";
import { decryptValue, encryptValue } from "../../common/security/encrypt.js";
import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_USER_ACCESS_SIGNATURE,
  JWT_REFRESH_EXPIRES_IN,
  JWT_USER_REFRESH_SIGNATURE,
} from "../../config/config.js";
import { createLoginTokens } from "../../common/security/token.security.js";
export async function signup(userData) {
  const { email } = userData;
  const userEmail = await findOneDoc({ model: userModel, filter: { email } });
  if (userEmail) {
    throw ConflictException({ errorMsg: "Email already exists." });
  }
  //   userData.password = await hash(userData.password, 12);
  userData.password = await hashValue({
    value: userData.password,
    saltRound: 12,
    tool: HashToolEnum.BCRYPT,
  });
  // userData.phone = await CryptoJS.AES.encrypt(
  //   userData.phone,
  //   "secret key 123",
  // ).toString();
  userData.phone = await encryptValue({
    value: userData.phone,
    key: "secret key 123",
  });
  const newUser = await createDoc({ model: userModel, insertedData: userData });
  return newUser;
}

export async function login(userData) {
  const { email, password } = userData;
  const user = await findOneDoc({ model: userModel, filter: { email } });
  if (!user) {
    throw NotFoundException({ errorMsg: "Invalid Email or Password." });
  }
  //   const isMatch = await compare(password, user.password);
  const isMatch = await compareHash({
    value: password,
    hash: user.password,
    tool: HashToolEnum.BCRYPT,
  });
  if (!isMatch) {
    throw NotFoundException({ errorMsg: "Invalid Email or Password." });
  }
  return createLoginTokens({ user });
}
