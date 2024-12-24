const jwt=require('jsonwebtoken')
const secret="JaiNepal321";
const tokenBlacklist = new Set();

function setUser( user) {

  return jwt.sign({
    _id:user._id,
    email:user.email,
  },secret)
}

function getUser(token) {
  if (!token) {
    return null;
  }

  try {
    // Verify the token and decode the payload
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    // If verification fails (e.g., expired or invalid token), return null
    console.error("Invalid or expired token", error);
    return null;
  }
}
function logout(token) {
  if (token) {
    // Add the token to the blacklist
    tokenBlacklist.add(token);
    console.log('Token blacklisted (logged out):', token);
  }
}
module.exports = { setUser, getUser,logout };
  