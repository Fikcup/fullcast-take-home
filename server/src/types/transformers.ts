import { Category } from "../models/Category";

export interface SortedCategory extends Category {
    children: Category[];
}