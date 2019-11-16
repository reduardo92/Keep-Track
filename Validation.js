const Joi = require('@hapi/joi');

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .min(6)
      .required()
  });
  return schema.validate(data);
};
const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string()
      .min(3)
      .required()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
      .min(6)
      .required()
  });

  return schema.validate(data);
};
const macrosValidation = data => {
  const schema = Joi.object({
    calories: Joi.string()
      .min(3)
      .max(4)
      .required(),
    fat: Joi.string()
      .min(1)
      .max(3)
      .required(),
    carbs: Joi.string()
      .min(1)
      .max(3)
      .required(),
    protein: Joi.string()
      .min(1)
      .max(3)
      .required()
  });

  return schema.validate(data);
};
const weightsValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z0-9,. ]*$/)
      .required(),
    exercise: Joi.string()
      .regex(/^[a-zA-Z0-9,. ]*$/)
      .required(),
    sets: Joi.string()
      .min(1)
      .max(2)
      .required(),
    reps: Joi.string()
      .min(1)
      .max(3)
      .required(),
    weight: Joi.string()
      .min(1)
      .max(4)
      .required()
  });

  return schema.validate(data);
};
const cardioValidation = data => {
  const schema = Joi.object({
    name: Joi.string()
      .regex(/^[a-zA-Z0-9,. ]*$/)
      .required(),
    exercise: Joi.string()
      .regex(/^[a-zA-Z0-9,. ]*$/)
      .required(),
    time: Joi.string()
      .min(1)
      .max(3)
      .required(),
    calories: Joi.string()
      .min(1)
      .max(4)
      .required()
  });

  return schema.validate(data);
};
const mealValidation = data => {
  const schema = Joi.object({
    label: Joi.string().required(),
    foodId: Joi.string().required(),
    image: Joi.required(),
    ENERC_KCAL: Joi.string()
      .min(1)
      .max(4)
      .required(),
    FAT: Joi.string()
      .min(1)
      .max(4)
      .required(),
    CHOCDF: Joi.string()
      .min(1)
      .max(4)
      .required(),
    PROCNT: Joi.string()
      .min(1)
      .max(4)
      .required(),
    meal: Joi.string().required(),
    measures: Joi.array().required(),
    servings: Joi.string().required(),
    size: Joi.string().required()
  });

  return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.macrosValidation = macrosValidation;
module.exports.weightsValidation = weightsValidation;
module.exports.cardioValidation = cardioValidation;
module.exports.mealValidation = mealValidation;
