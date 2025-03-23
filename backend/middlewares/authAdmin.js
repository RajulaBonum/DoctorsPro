/**
 * authAdmin.js
 * -------------
 * This middleware protects admin routes by verifying the JWT token sent in the request headers.
 * It expects the token to be provided under the header "atoken".
 * The token should match the concatenation of the admin email and password (as set in environment variables).
 * If the token is valid, the request is allowed to proceed; otherwise, an error response is returned.
 */

import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    // Retrieve the token from headers (should be provided as "atoken")
    const { atoken } = req.headers;
    if (!atoken) {
      return res.json({ success: false, message: "Not authorized. Please login again." });
    }

    // Verify the token using the secret
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

    // Compare the decoded token with the expected admin credentials string
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({ success: false, message: "Not authorized. Please login again." });
    }

    // If everything is fine, proceed to the next middleware or route handler
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authAdmin;
