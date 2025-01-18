import mongoose from 'mongoose';

async function connecttoMongoDB(URL){
    return mongoose.connect(URL);
}

export{
    connecttoMongoDB
}