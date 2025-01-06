import joi from 'joi';


const bookValidation={ add:{
    body:joi.object().keys({
        title:joi.string().required(),
        author:joi.string().required(),
        publishedYear:joi.date().required(),
        genre:joi.string().required(),
        rating:joi.number().required()
    })},
    validateSingle:{

        params: joi.object().keys({ bookId: joi.string().length(24).required(), })
    }
}


export{
    bookValidation
}
