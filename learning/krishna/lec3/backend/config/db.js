const mongoose=require('mongoose');

const connection = mongoose.connect('mongodb://127.0.0.1:27017/student')
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch(err => {
    console.error('MongoDB connection failed:', err);
});



module.exports=connection;