import Joi from "joi";

export const newVacationValidator = Joi.object({
  destination: Joi.string().min(3).max(40).required(),
  description: Joi.string().min(10).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().min(Joi.ref("startDate")).required(),
  price: Joi.number().min(0).required()
});


export const newVacationImageValidator = Joi.object({
  image: Joi.object({
    mimetype: Joi.string().valid("image/jpeg", "image/png", "image/webp")
  })
    .unknown(true)
    .optional()
});

export const updateVacationValidator = newVacationValidator;
