import { drizzle } from "drizzle-orm/neon-http"
import { ApiError } from "../utils/api-error"

if (!process.env.DATABASE_URL) {
    throw new ApiError(500, "DB Connection string not found!");
}

export const db = drizzle(process.env.DATABASE_URL)