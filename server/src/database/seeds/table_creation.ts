import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("notes");
    await knex.schema.dropTableIfExists("categories");

    await knex.schema
        .createTable("categories", function (table) {
            table.increments("categoryId").unsigned();
            table.integer("parentCategoryId").unsigned().nullable();
            table.string("categoryName", 255).notNullable();
            table.foreign("parentCategoryId").references("categories.categoryId");
        })
        .createTable("notes", function (table) {
            table.increments("noteId").unsigned();
            table.string("title", 255).notNullable();
            table.string("content", 255).notNullable();
            table.integer("categoryId").unsigned().notNullable();
            table.timestamps(true, true, true);
            table.timestamp("deletedAt").nullable().defaultTo(knex.fn.now());
            table.foreign("categoryId").references("categories.categoryId");
        });
};
