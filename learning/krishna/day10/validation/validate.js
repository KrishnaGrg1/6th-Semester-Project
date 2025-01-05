import joi from 'joi'

const addCarSchema=joi.object().keys({
    name:joi.string().min(3).required(),
    manufacturer:joi.string().pattern(new RegExp('^[a-zA-Z0-9\ ]{3,30}$')).required(),
    price:joi.number().min(10).required(),
    makeYear:joi.date().required(),
})


export {
    addCarSchema
}