import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("notes");
    await knex.schema.dropTableIfExists("categories");

    await knex.schema
        .createTable("categories", function (table) {
            table.increments("categoryId").unsigned().primary();
            table.string("categoryName", 255).notNullable();
            table.integer("parentCategoryId").unsigned().nullable();
            table.timestamps(true, true, true);
            table.timestamp("deletedAt").nullable();
            table.foreign("parentCategoryId").references("categories.categoryId");
        })
        .createTable("notes", function (table) {
            table.increments("noteId").unsigned().primary();
            table.string("content", 255).notNullable();
            table.integer("categoryId").unsigned().notNullable();
            table.timestamps(true, true, true);
            table.timestamp("deletedAt").nullable();
            table.foreign("categoryId").references("categories.categoryId");
        });
};
