const { getUser  } = require("../services/auth");

async function restrictToLoggedinUserOnly(req, res, next) {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.redirect("/login");
    }

    try {
        const user = await getUser (userUid); // Await the result of getUser 

        if (!user) {
            return res.redirect("/login");
        }

        req.user = user; // Attach user to request object
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error("Error retrieving user:", error);
        return res.redirect("/login"); // Redirect on error
    }
}

module.exports = { restrictToLoggedinUserOnly };