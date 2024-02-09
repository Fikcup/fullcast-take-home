// ext dependencies
import knex from "knex";

// int dependencies
import { Category } from "../../models/Category";
import { CreateCategoryInput, CreateNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";
import { Note } from "../../models/Note";
import { createNote } from "../notes/create";
import { CustomError } from "../../types/errors";

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
        const categoryId: Category["categoryId"] = await knex(knexConfig).transaction(async (trx) => {
            const insertResult: number[] = await trx<Category>("categories")
                .insert(
                    {
                        categoryName,
                        parentCategoryId
                    }
                );

            // empty note creation
            const noteInput: CreateNoteInput = {
                content: "",
                categoryId: insertResult[0]
            }
            await createNote(noteInput, trx<Note>("notes"));
            
            return insertResult[0];
        });

        // fetch newly created category
        const result = await knex(knexConfig)<Category>("categories")
            .select("*")
            .first()
            .where("categoryId", categoryId);
           
        return result;

    } catch (err) {
        throw new CustomError(
            err.message 
                ? err.message 
                : "Bad Server Request", 
            err.statusCode
                ? err.statusCode
                : 500
        );
    }
};