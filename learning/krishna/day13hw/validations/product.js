import joi from "joi";

export default {
  created: {
    body: joi.object().keys({
      name: joi.string().min(3).required(),
      cost: joi.number().min(0).required(),
      stockQuantity: joi.number().min(0).required(),
      createdBy: joi.string().length(25)
    })
  }
};
