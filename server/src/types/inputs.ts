export interface ChangeNoteInput {
    content: string;
    categoryId: number;
}

export interface ChangeCategoryInput {
    categoryName: string;
    parentCategoryId?: number;
}