/**
 * authUser.js
 * -------------
 * This middleware protects user routes by verifying the JWT token sent in the request headers.
 * It expects the token to be provided under the header "token".
 * Once verified, it attaches the user's ID to the request body (req.body.userId)
 * so that subsequent handlers can use the user's identity.
 */

import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    // Retrieve the token from headers (provided as "token")
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Not authorized. Please login again." });
    }

    // Verify the token using the JWT secret
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user ID to the request body
    req.body.userId = token_decode.id;

    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
