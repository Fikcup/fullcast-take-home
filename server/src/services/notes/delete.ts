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
 * @param trx (optional)
 * @returns void
 */
export const softDeleteNotesByCategory = async (
    input: SoftDeleteNoteInput,
    trx?: knex.Knex.QueryBuilder<Note>
): Promise<void> => {
    const { categoryIds } = input;

    try {
        const notesRepo = trx ? trx : knex(knexConfig)<Note>("notes");
        await notesRepo
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