import * as bcrypt from "bcrypt";
import * as argon2 from "argon2";
import { HashToolEnum } from "../enum/hash.enum.js";
import { SALT_ROUND } from "../../config/config.js";
export async function hashValue({
  value,
  saltRound = SALT_ROUND,
  tool = HashToolEnum.BCRYPT,
}) {
  let hashedValue;
  switch (tool) {
    case HashToolEnum.BCRYPT:
      hashedValue = await bcrypt.hash(value, saltRound);
      break;
    case HashToolEnum.ARGON2:
      hashedValue = await argon2.hash(value);
      break;
    default:
      break;
  }
  return hashedValue;
}
export async function compareHash({ value, hash, tool = HashToolEnum.BCRYPT }) {
  let compareResult;
  switch (tool) {
    case HashToolEnum.BCRYPT:
      compareResult = await bcrypt.compare(value, hash);
      break;
    case HashToolEnum.ARGON2:
      compareResult = await argon2.verify(hash, value);
      break;
    default:
      break;
  }
  return compareResult;
}
