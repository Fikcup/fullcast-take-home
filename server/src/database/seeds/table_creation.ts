// ext dependencies
import { Knex } from "knex";

// int dependencies
import { Category } from "../../models/Category";
import { Note } from "../../models/Note";

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
    
    await knex<Category>("categories").insert([
        { categoryId: 1, categoryName: "Bread" },
        { categoryId: 2, categoryName: "Pastry" },
        { categoryId: 3, categoryName: "Sourdough", parentCategoryId: 1 },
        { categoryId: 4, categoryName: "Potato", parentCategoryId: 1 },
        { categoryId: 5, categoryName: "Whole Wheat", parentCategoryId: 1 },
        { categoryId: 6, categoryName: "Rolls", parentCategoryId: 3 },
        { categoryId: 7, categoryName: "Danish", parentCategoryId: 2 },
        { categoryId: 8, categoryName: "Croissant", parentCategoryId: 2 },
        { categoryId: 9, categoryName: "Baklava", parentCategoryId: 2 },
    ]);

    await knex<Note>("notes").insert([
        { content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et orci eros. Pellentesque in purus quis purus ultrices lacinia. Sed nec dapibus nunc. Mauris tortor.", categoryId: 1 },
        { content: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque luctus.", categoryId: 2 },
        { content: "", categoryId: 3 },
        { content: "", categoryId: 4 },
        { content: "", categoryId: 5 },
        { content: "", categoryId: 6 },
        { content: "", categoryId: 7 },
        { content: "", categoryId: 8 },
        { content: "", categoryId: 9 },
    ]);
};
