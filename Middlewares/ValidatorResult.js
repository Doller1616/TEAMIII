const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
    const result = validationResult(req);
    const errorArr = result?.array()?.map((err)=> (err?.msg));
    if (!result.isEmpty()) {
      req.errorStatus = 400;
      next(errorArr);
    }
    next()
};