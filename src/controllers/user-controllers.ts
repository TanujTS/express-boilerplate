import { db } from "../db";
import { user } from "../db/schema";
import { ApiError } from "../utils/api-error";
import { responseCreated, responseOk } from "../utils/api-response";
import { asyncHandler } from "../utils/request-handler";


export const userProfile = asyncHandler(async (req, res) => {
    const user = req?.user
    if (!user) {
        throw new ApiError(401, "Unauthorized");
    }
    return responseOk(res, user, "Fetched user data.");
})

export const listUsers = asyncHandler(async (req, res) => {
    const reqUser = req.user;
    if (!reqUser) {
        throw new ApiError(401, "Auth is required");
    }
    const users = await db.select().from(user);
    return responseOk(res, users, "Fetched users!");
})