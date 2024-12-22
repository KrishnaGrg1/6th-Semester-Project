const {getUserId}=require('../service/auth')


async function restrictToLoggedInUser(req,res,next){
    const Useruid=req.cookies?.uid;

    if(!Useruid) return res.redirect('/login');

    const user=getUserId(Useruid);
    if(!user) return res.redirect('/login');

    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    const Useruid=req.cookies?.uid;
    const user=getUserId(Useruid);
    req.user=user;
    next();
}

module.exports={
    restrictToLoggedInUser,
    checkAuth
}