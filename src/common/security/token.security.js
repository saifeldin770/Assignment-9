import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_USER_ACCESS_SIGNATURE,
  JWT_REFRESH_EXPIRES_IN,
  JWT_USER_REFRESH_SIGNATURE,
  JWT_ADMIN_ACCESS_SIGNATURE,
  JWT_ADMIN_REFRESH_SIGNATURE,
} from "../../config/config.js";
import {
  BadRequestException,
  UnAuthorizedException,
} from "../exceptions/app.exceptions.js";
import { findByIdDoc } from "../../DB/repo/repo.db.js";
import userModel from "../../DB/model/user.model.js";
import { RoleEnum } from "../enum/user.enum.js";
import { TokenTypeEnum } from "../enum/token.enum.js";
export function signToken({ payload = {}, signature, options } = {}) {
  return jwt.sign(payload, signature, options);
}
export function verifyToken({ token, signature } = {}) {
  return jwt.verify(token, signature);
}
export function decodeToken(token) {
  return jwt.decode(token);
}
export function getSignature(userRole = RoleEnum.USER) {
  let signatures = {};
  switch (userRole) {
    case RoleEnum.USER:
      signatures.access_signature = JWT_USER_ACCESS_SIGNATURE;
      signatures.refresh_signature = JWT_USER_REFRESH_SIGNATURE;
      break;
    case RoleEnum.ADMIN:
      signatures.access_signature = JWT_ADMIN_ACCESS_SIGNATURE;
      signatures.refresh_signature = JWT_ADMIN_REFRESH_SIGNATURE;
      break;
    default:
      break;
  }
  return signatures;
}
export function createLoginTokens({
  user,
  options,
  refreshExpiresIn = JWT_REFRESH_EXPIRES_IN,
} = {}) {
  const { access_signature, refresh_signature } = getSignature(user.role);
  const access_token = signToken({
    signature: access_signature,
    options: {
      ...options,
      expiresIn: JWT_ACCESS_EXPIRES_IN,
      subject: user.id,
      audience: [user.role],
    },
  });
  const refresh_token = signToken({
    signature: refresh_signature,
    options: {
      ...options,
      expiresIn: refreshExpiresIn,
      subject: user.id,
      audience: [user.role],
    },
  });
  return { access_token, refresh_token };
}
export async function checkToken({ token, tokenType } = {}) {
  const payload = decodeToken(token);
  if (!payload.aud.length) {
    throw BadRequestException("Old Token data ,login again.");
  }
  if (!payload.sub) {
    throw UnAuthorizedException({ errorMsg: "Id Not Found." });
  }
  const { access_signature, refresh_signature } = getSignature(payload.aud[0]);
  jwt.verify(
    token,
    tokenType == TokenTypeEnum.ACCESS ? access_signature : refresh_signature,
  );

  const user = await findByIdDoc({ model: userModel, id: payload.sub });

  if (!user) {
    throw UnAuthorizedException({ errorMsg: "User Not Found." });
  }
  return { user, payload };
}
