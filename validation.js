const joi = require("@hapi/joi");
const Joi = require("@hapi/joi");

// Validate registration data

const registerValidation = (data) => {
  const schema = Joi.object({
    name: joi.string().min(3).max(225).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024),
  });

  return schema.validate(data);
};

// Validate login data

const loginValidation = (data) => {
  const schema = Joi.object({
    email: joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
