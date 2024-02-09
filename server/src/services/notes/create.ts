// ext dependencies
import knex from "knex";

// int dependencies
import { Note } from "../../models/Note";
import { CreateNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";
import { CustomError } from "../../types/errors";

/**
 * Creates a new note
 * 
 * @param input { content: string, categoryId: number}
 * @param trx optional Knex transaction field
 * @returns Note
 */
export const createNote = async (
    input: CreateNoteInput,
    trx?: knex.Knex.QueryBuilder<Note>
): Promise<Note> => {
    const { content, categoryId } = input;

    try {
        const notesRepo = trx ? trx : knex(knexConfig)<Note>("notes");
        const insertResult: number[] = await notesRepo.insert(
                {
                    content,
                    categoryId
                }
            );

        // fetch newly created note
        const note = await notesRepo
            .select("*")
            .where("noteId", insertResult[0]);

        return note[0];
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