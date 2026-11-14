import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const sessions = sqliteTable("sessions", { id: text("id").primaryKey(), jobTitle:text("job_title").notNull(), stack:text("stack").notNull(), score:integer("score").notNull(), answered:integer("answered").notNull(), createdAt:text("created_at").notNull() });
