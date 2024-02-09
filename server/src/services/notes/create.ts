import knex from "knex";
import { Note } from "../../models/Note";
import { ChangeNoteInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";

export const createNote = async (
    input: ChangeNoteInput
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

        const note = await knex(knexConfig)<Note>("notes")
            .select("*")
            .where("noteId", insertResult[0]);

        return note[0];
    } catch (err) {
        throw new Error(err);
    }
};