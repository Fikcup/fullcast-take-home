// ext dependencies
import knex from "knex";

// int dependencies
import { Category } from "../../../models/Category";
import { knexConfig } from "../../../database/connection";
import { CustomError } from "../../../types/errors";
import { transformCategoryFetchArray } from "../../../utils/categoryTransformers";
import { SortedCategory } from "../../../types/transformers";

/**
 * Fetches all active categories
 * 
 * @returns Categories sorted with nested children elements
 */
export const fetchAllCategories = async ()
: Promise<SortedCategory[]> => {
    try {
        const categories = await knex(knexConfig)<Category>("categories")
            .select("*")
            .where("deletedAt", null)
            .orderBy("parentCategoryId", "asc");

        // Group categories into arrays
        const sortedCategories = transformCategoryFetchArray(categories);
        return sortedCategories;
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