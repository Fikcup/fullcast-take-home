// ext dependencies
import knex from "knex";

// int dependencies
import { Category } from "../../models/Category";
import { UpdateCategoryInput } from "../../types/inputs";
import { knexConfig } from "../../database/connection";

/**
 * Updates an existing category
 * 
 * @param input { categoryId: number, categoryName?: string, parentCategoryId?: number}
 * @returns Category
 */
export const updateCategory = async (
    input: UpdateCategoryInput
): Promise<Category> => {
    const { categoryId, categoryName, parentCategoryId } = input;

    try {
        // if updatable field provided, update category
        if (categoryName || parentCategoryId) {
            await knex(knexConfig)<Category>("categories")
                .where("categoryId", categoryId)
                .update(
                    {
                        categoryName,
                        parentCategoryId
                    }
                )
        }

        // fetch updated category
        const category = await knex(knexConfig)<Category>("categories")
            .select("*")
            .where("categoryId", categoryId);
        
        return category[0];
    } catch (err) {
        throw new Error(err);
    }
};