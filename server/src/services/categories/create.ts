// ext dependencies
import knex from "knex";

// int dependencies
import { Category } from "../../models/Category";
import { CreateCategoryInput, CreateNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";
import { Note } from "../../models/Note";
import { createNote } from "../notes/create";

/**
 * Creates a new category with an empty note field
 * 
 * @param input { categoryName: string, parentCategoryId?: number}
 * @returns Category
 */
export const createCategory = async (
    input: CreateCategoryInput
): Promise<Category> => {
    const { categoryName, parentCategoryId } = input;

    try {
        const insertResult: number[] = await knex(knexConfig)<Category>("categories")
            .insert(
                {
                    categoryName,
                    parentCategoryId
                }
            );

        await knex(knexConfig)<Note>("notes")

        // fetch newly created category
        const category = await knex(knexConfig)<Category>("categories")
            .select("*")
            .where("categoryId", insertResult[0]);

        // empty note creation
        const noteInput: CreateNoteInput = {
            content: "",
            categoryId: category[0].categoryId
        }
        await createNote(noteInput);
        
        return category[0];
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
};