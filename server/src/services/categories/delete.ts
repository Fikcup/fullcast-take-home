// ext dependencies
import knex from "knex";

// int dependencies
import { Category } from "../../models/Category";
import { SoftDeleteCategoryInput, SoftDeleteNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";
import { softDeleteNotesByCategory } from "../notes/delete";

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
        // TODO: add transaction to allow for rollbacks if any step fails

        // fetch all ids of to be deleted categories
        const toDeleteCategoryIdObjects = await knex(knexConfig)<Category>("categories")
            .where("categoryId", categoryId)
            .orWhere("parentCategoryId", categoryId)
            .select("categoryId");
        const toDeleteCategoryIds: number[] = toDeleteCategoryIdObjects
            .map(obj => Object.values(obj)[0]);
        
        // soft delete category and any child categories
        await knex(knexConfig)<Category>("categories")
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
        await softDeleteNotesByCategory(noteInput);

        return;
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
};