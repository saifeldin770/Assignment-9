import {
  ForbiddenExceptions,
  NotFoundException,
  UnAuthorizedException,
} from "../common/exceptions/app.exceptions.js";
import jwt from "jsonwebtoken";
import {
  JWT_USER_ACCESS_SIGNATURE,
  JWT_USER_REFRESH_SIGNATURE,
} from "../config/config.js";
import { findByIdDoc } from "../DB/repo/repo.db.js";
import userModel from "../DB/model/user.model.js";
import { TokenTypeEnum } from "../common/enum/token.enum.js";
import { checkToken } from "../common/security/token.security.js";

function authorization(roles) {
  return async function (req, res, next) {
    if (roles.includes(req.user.role)) {
      throw ForbiddenExceptions({ errorMsg: "You don't have access." });
    }
    next();
  };
}
export default authorization;
