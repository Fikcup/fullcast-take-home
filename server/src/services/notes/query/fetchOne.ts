// ext dependencies
import knex from "knex";

// int dependencies
import { Note } from "../../../models/Note";
import { knexConfig } from "../../../database/connection";
import { FetchNoteInput } from "../../../types/inputs";
import { NextFunction } from "express";
import { CustomError } from "../../../types/errors";

/**
 * Fetches the note associated with the category
 * 
 * @param input { categoryId: number }
 * @returns Note
 */
export const fetchNote = async (
    input: FetchNoteInput
) => {
    const { categoryId } = input;

    try {
        const note = await knex(knexConfig)<Note>("notes")
            .first("*")
            .where("categoryId", categoryId)
            .andWhere("deletedAt", null);

        // If no note found, throw invalid category id error
        if (!note) {
            throw new CustomError(
                `Invalid Category Id ${categoryId}`,
                400
            )
        }

        return note;
    } catch (err) {
        throw new CustomError(
            err.message 
                ? err.message 
                : "Bad Server Request", 
            500
        );
    }
}