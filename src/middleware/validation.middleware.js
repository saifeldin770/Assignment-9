import { SystemLanguageEnum } from "../common/enum/system.enum.js";
import { BadRequestException } from "../common/exceptions/app.exceptions.js";

function validation(schema) {
  return (req, res, next) => {
    const language = req.headers["accept-language"] || SystemLanguageEnum.EN;

    const validateData = schema(language).safeParse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    // console.log({ validateData });
    if (!validateData.success) {
      throw BadRequestException({
        errorMsg: "Validation Failed.",
        cause: {
          issues: validateData.error.issues,
        },
      });
    }
    req.validateData = validateData;
    next();
  };
}
export default validation;
