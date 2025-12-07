import { db } from "../db";
import { user } from "../db/schema";
import { ApiError } from "../utils/api-error";
import { responseCreated } from "../utils/api-response";
import { asyncHandler } from "../utils/request-handler";


export const createUser = asyncHandler(async (req, res) => {
    const { name } = req.body?? {}; //?? {} is a temp guard, until zod validation is implemented
    if (!name) {
        throw new ApiError(400, "Missing name.");
    }
    const [insertedUser] = await db.insert(user).values({ name }).returning()
    return responseCreated(res, insertedUser);
})