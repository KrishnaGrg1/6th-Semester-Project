import joi from "joi";

const UserValidation = {
  register: {
    body: joi.object().keys({
      name: joi.string().min(3).required(),
      email: joi.string().email().required(),
      address: joi.string().min(3).required(),
      phone: joi.string().pattern(new RegExp("^[0-9+ -]{8,15}$")).required(),
      password: joi.string().min(8).required()
    })
  },
  login: {
    body: joi.object().keys({
      email: joi.string().email().required(),
  
      password: joi.string().min(8).required()
    })
  }
};

export { UserValidation };
