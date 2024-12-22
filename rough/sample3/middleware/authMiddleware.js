const { getUser } = require('../services/authService');

function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;

    const user = getUser(userUid);

    req.user = user;
    next();
}

function restrictToSubscribedUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) return res.redirect("/login");
    const user = getUser(userUid);

    if (!user) return res.redirect("/login");

    if (!user.subscription.isActive) {
        return res.status(403).send('You need a subscription to view movies.');
    }

    req.user = user;
    next();
}

module.exports = {
    restrictToLoggedinUserOnly,
    checkAuth,
    restrictToSubscribedUserOnly
};