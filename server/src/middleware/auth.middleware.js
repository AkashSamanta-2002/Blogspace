import { User } from "../models/user.model.js";
import { getUserFromToken } from "../services/jwt.service.js";
import { asynchandler } from "../utils/asyncHandler.util.js";
import { errorhandler } from "../utils/errorHandler.util.js";

export const JWTAuthenticate = asynchandler(async (req, res, next) => {
    const token = req.cookies?.token;

    // Check token available or not
    if(!token) {
        return next(new errorhandler("Invalid token", 400));
    }

    // get user 
    const userFromToken = getUserFromToken(token);

    if(!userFromToken) {
        return next(new errorhandler("Invalid token", 400));
    }

    // get user details
    const user = await User.findById(userFromToken._id, {password: false});
    if(!user) {
        return next(new errorhandler("Something went wrong while authenticating", 400));
    }

    // set user in request object
    req.user = user;

    next();
})

export const JWTAdminAuthenticate = asynchandler(async (req, res, next) => {
    const token = req.cookies?.token;

    // Check token available or not
    if(!token) {
        return next(new errorhandler("Invalid token", 400));
    }

    // get user 
    const userFromToken = getUserFromToken(token);

    if(!userFromToken) {
        return next(new errorhandler("Invalid token", 400));
    }

    // get user details
    const user = await User.findById(userFromToken._id, {password: false});
    if(!user) {
        return next(new errorhandler("Something went wrong while authenticating", 400));
    }

    if(!user.role.includes('admin')) {
        return next(new errorhandler("Only admin access allowed", 400));
    }

    // set user in request object
    req.user = user;

    next();
})