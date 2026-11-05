export function BadRequestException({
  errorMsg = "Bad Request",
  cause = {},
  statusCode = 400,
} = {}) {
  throw new Error(errorMsg, { cause: { statusCode, ...cause } });
}
export function ConflictException({
  errorMsg = "Conflict",
  cause = { statusCode: 409 },
} = {}) {
  throw new Error(errorMsg, { cause });
}
export function NotFoundException({
  errorMsg = "Not Found",
  cause = { statusCode: 404 },
} = {}) {
  throw new Error(errorMsg, { cause });
}
export function UnAuthorizedException({
  errorMsg = "UnAuthorized",
  cause = { statusCode: 401 },
}) {
  throw new Error(errorMsg, { cause });
}
export function ForbiddenExceptions({
  errorMsg = "Foebidden",
  cause = { statusCode: 403 },
}) {
  throw new Error(errorMsg, { cause });
}
