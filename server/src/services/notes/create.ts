// ext dependencies
import knex from "knex";

// int dependencies
import { Note } from "../../models/Note";
import { CreateNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";

/**
 * Creates a new note
 * 
 * @param input { content: string, categoryId: number}
 * @returns Note
 */
export const createNote = async (
    input: CreateNoteInput
): Promise<Note> => {
    const { content, categoryId } = input;

    try {
        const insertResult: number[] = await knex(knexConfig)<Note>("notes")
            .insert(
                {
                    content,
                    categoryId
                }
            );

        // fetch newly created note
        const note = await knex(knexConfig)<Note>("notes")
            .select("*")
            .where("noteId", insertResult[0]);

        return note[0];
    } catch (err) {
        throw new Error(err);
    }
};