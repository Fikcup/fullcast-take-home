// ext dependencies
import knex from "knex";

// int dependencies
import { Category } from "../../models/Category";
import { SoftDeleteCategoryInput, SoftDeleteNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";
import { softDeleteNotesByCategory } from "../notes/delete";
import { CustomError } from "../../types/errors";
import { Note } from "../../models/Note";

/**
 * Soft deletes an existing category and associated note
 * 
 * @param input { categoryId: number }
 * @returns void
 */
export const softDeleteCategory = async (
    input: SoftDeleteCategoryInput
): Promise<void> => {
    const { categoryId } = input;

    try {
        await knex(knexConfig).transaction(async (trx) => {
            const toDeleteCategoryIdObjects = await trx<Category>("categories")
                .where("categoryId", categoryId)
                .orWhere("parentCategoryId", categoryId)
                .select("categoryId");
            const toDeleteCategoryIds: number[] = toDeleteCategoryIdObjects
                .map(obj => Object.values(obj)[0]);
            
            // soft delete category and any child categories
            await trx<Category>("categories")
                .whereIn("categoryId", toDeleteCategoryIds)
                .update(
                    {
                        deletedAt: new Date()
                    }
                );

            // soft delete associated notes
            const noteInput: SoftDeleteNoteInput = { 
                categoryIds: toDeleteCategoryIds 
            };
            await softDeleteNotesByCategory(noteInput, trx<Note>("notes"));
        });

        return;
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