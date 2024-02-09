// ext dependencies
import knex from "knex";

// int dependencies
import { Note } from "../../models/Note";
import { UpdateNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";

/**
 * Updates an existing note
 * 
 * @param input { noteId: number, content: string }
 * @returns Note
 */
export const updateNote = async (
    input: UpdateNoteInput
): Promise<Note> => {
    const { noteId, content } = input;
    
    try {
        // update note
        await knex(knexConfig)<Note>("notes")
            .where("noteId", noteId)
            .update({ content });

        // fetch updated note
        const note = await knex(knexConfig)<Note>("notes")
            .select("*")
            .where("noteId", noteId);

        return note[0];
    } catch (err) {
        console.error(err);
        throw new Error(err);
    }
};
