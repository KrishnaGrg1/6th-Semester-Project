import  joi from 'joi';

const addCurrencySchema = joi.object().keys({
      name: joi.string().min(3).max(30).required(),
      exchangeRate: joi.number().min(0).required(),
      foundIn: joi.date().required()
    });

const addmainSchema= joi.object().keys({
    date: joi.date(),
    source: joi.string().min(3).required(),
    updatedBy:joi.string().min(3).required(),
    currencies:addCurrencySchema
}).required();



export  {addmainSchema,addCurrencySchema}
