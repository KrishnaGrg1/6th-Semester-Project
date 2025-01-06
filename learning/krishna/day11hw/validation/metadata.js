import joi from 'joi';


const update={
    body:joi.object().keys({
        source:joi.string().required(),
        updatedBy:joi.string().required()
    })
}

export{
    update
}