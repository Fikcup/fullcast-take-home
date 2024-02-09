import { Category } from "../models/Category";
import { SortedCategory } from "../types/transformers";

/**
 * Takes in unsorted categories and returns arrays of sorted categories
 * 
 * @param array Array of Category
 * @returns Array of SortedCategory
 */
export const transformCategoryFetchArray = (
    array: Category[]
): SortedCategory[] => {
    const childMap = array.reduce((map, child) => {
        return {
            ...map,
            [child.categoryId]: {
                ...child
            }
        };
    }, {});

    const root: SortedCategory[] = [];

    Object.values(childMap).forEach((child: SortedCategory) => {
        if (child.parentCategoryId) {
            if (childMap[child.parentCategoryId]) {
                const parent = childMap[child.parentCategoryId];
                if (!parent.children) {
                    parent.children = [];
                }

                parent.children.push(child)
            }
        } else {
            root.push(child);
        }
    })

    return root;
};