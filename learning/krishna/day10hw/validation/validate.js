import  joi from 'joi';

const addCurrencySchema = joi.object().keys({
      name: joi.string().min(3).max(30).required(),
      exchangeRate: joi.number().min(0).required(),
      foundIn: joi.date().required()
    });

const addmainSchema= joi.object().keys({
   
    source: joi.string().min(3).required(),
    updatedBy:joi.string().min(3).required(),
    currencies:joi.array().items(addCurrencySchema)
}).required();



export  {addmainSchema,addCurrencySchema}
