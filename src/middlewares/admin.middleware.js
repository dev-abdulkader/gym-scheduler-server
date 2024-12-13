import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAdmin = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Check if the user role in the token is 'admin'
    if (decodedToken?.role !== "admin") {
      throw new ApiError(403, "Access denied. Admins only.");
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    throw new ApiError(403, error?.message || "Access denied.");
  }
});
