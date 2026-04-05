import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  // Ensure req and headers exist
  if (!req || !req.headers) {
    console.error("authMiddleware: req or req.headers missing");
    return res.status(400).json({ success: false, message: "Bad request" });
  }

  // Support Authorization: Bearer <token> or token header
  const authHeader = req.headers.authorization || req.headers.token;
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  // If header is "Bearer <token>" extract the token
  const token = typeof authHeader === "string" && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.body = req.body || {};
    req.body.userId = payload.id || payload.userId || null;
    return next();
  } catch (err) {
    console.error("authMiddleware: JWT verify error:", err);
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;