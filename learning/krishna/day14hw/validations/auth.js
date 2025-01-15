import joi from 'joi'

export default{
    register:{
        body: joi.object().keys({
            name:joi.string().min(3).required(),
            email:joi.string().email().required(),
            password:joi.string().min(8).required(),
            address:joi.string().min(3).required(),
            phone: joi.string().min(10).pattern(/^[0-9- \+]+$/).required(),
        })
        
    },
    login:{
        body:joi.object().keys({
            email:joi.string().email().required(),
            password:joi.string().min(8).required()
        })
    }
}