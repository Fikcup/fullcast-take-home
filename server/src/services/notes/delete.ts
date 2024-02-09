// ext dependencies
import knex from "knex";

// int dependencies
import { SoftDeleteNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";
import { Note } from "../../models/Note";
import { CustomError } from "../../types/errors";

/**
 * Soft deletes an existing note
 * 
 * @param input { categoryIds: number[] }
 * @returns void
 */
export const softDeleteNotesByCategory = async (
    input: SoftDeleteNoteInput
): Promise<void> => {
    const { categoryIds } = input;

    try {
        await knex(knexConfig)<Note>("notes")
            .whereIn("categoryId", categoryIds)
            .update(
                {
                    deletedAt: new Date()
                }
            );

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