export interface ChangeNoteInput {
    content: string;
    categoryId: number;
}

export interface CreateCategoryInput {
    categoryName: string;
    parentCategoryId?: number;
}

export interface UpdateCategoryInput {
    categoryId: number;
    categoryName?: string;
    parentCategoryId?: number;
}

export interface SoftDeleteCategoryInput {
    categoryId: number;
}