import { setUser, getUser } from '../services/auth.js';

async function checkForAuthentication(req,res,next){
  const authorizationHeaderValue = req.headers["authorization"];
  if(!authorizationHeaderValue || !authorizationHeaderValue)
  
  next();
}

async function restrictToLoggedinUserOnly(req, res, next) {
  const userUid = req.cookies?.uid;
 console.log(userUid)
  if (!userUid) return res.redirect("/login");
  const user = getUser(userUid);

  if (!user) return res.redirect("/login");

  req.user = user;
  next();
}

async function checkAuth(req, res, next) {
  const userUid = req.cookies?.uid;

  const user = getUser(userUid);

  req.user = user;
  next();
}


export {
  restrictToLoggedinUserOnly,
  checkAuth,
};
