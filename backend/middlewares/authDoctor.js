/**
 * authDoctor.js
 * ---------------
 * This middleware protects doctor routes by verifying the JWT token sent in the request headers.
 * It expects the token to be provided under the header "dtoken".
 * Upon successful verification, it attaches the doctor's ID to the request body (req.body.docId)
 * so that subsequent handlers can identify the logged-in doctor.
 */

import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    // Retrieve the doctor token from headers (provided as "dtoken")
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.json({ success: false, message: "Not authorized. Please login again." });
    }

    // Verify the token using the JWT secret
    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    // Attach the doctor ID to the request body for downstream use
    req.body.docId = token_decode.id;

    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export default authDoctor;
