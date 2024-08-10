import Joi from "joi";

export const createApartmentInput = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  unit_area: Joi.number().required(),
  price: Joi.number().required(),
  bedrooms: Joi.number().required(),
  bathrooms: Joi.number().required(),
  ready_by: Joi.date(),
  area_id: Joi.number().required(),
  compound_id: Joi.number().required(),
  finishing: Joi.string().valid("Not Finished", "Finished").required(),
  images: Joi.array(),
});
