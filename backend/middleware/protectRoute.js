import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jcookie;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Token does not exist" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded) {
      return res.status(403).json({
        success: false,
        message: "Authentication error: Token does not match",
      });
    }

    req.user = decoded.id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Authentication error: Token expired",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(403).json({
        success: false,
        message: "Authentication error: Invalid Token",
      });
    }

    // Log unexpected errors
    console.error("Unexpected Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
