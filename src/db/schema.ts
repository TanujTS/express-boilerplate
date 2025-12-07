import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const timestamps = {
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull()
}

export const user = pgTable("user", {
    id: uuid().defaultRandom().unique().primaryKey(),
    name: text().notNull(),
    ...timestamps
})