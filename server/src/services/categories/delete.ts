// ext dependencies
import knex from "knex";

// int dependencies
import { Category } from "../../models/Category";
import { SoftDeleteCategoryInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";

/**
 * Soft deletes an existing category
 * 
 * @param input { categoryId: number }
 * @returns void
 */
export const softDeleteCategory = async (
    input: SoftDeleteCategoryInput
): Promise<void> => {
    const { categoryId } = input;

    try {
        await knex(knexConfig)<Category>("categories")
            .where("categoryId", categoryId)
            .update(
                {
                    deletedAt: new Date()
                }
            );

        return;
    } catch (err) {
        throw new Error(err);
    }
};