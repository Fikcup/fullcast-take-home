import { Category } from "../models/Category";

/**
 * Takes in unsorted categories and returns arrays of categories grouped by parentCategoryId
 * 
 * @param array Array of Categories
 * @returns Categories grouped by parentCategoryId
 */
export const transformCategoryFetchArray = (
    array: Category[]
): Category[][] => {
    const transformCategoryFetchArray: Category[][] = Object.values(array.reduce((acc, obj) => {
        const { parentCategoryId, categoryName, ...rest } = obj;
        acc[parentCategoryId] = acc[parentCategoryId] || [];
        acc[parentCategoryId].push({ categoryName, parentCategoryId, ...rest });
        return acc;
      }, {}))
      
    return transformCategoryFetchArray.map(group => group.sort((a, b) => a.categoryName.localeCompare(b.categoryName)));
};