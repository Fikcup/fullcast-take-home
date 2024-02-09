export interface FetchNoteInput {
    categoryId: number;
}

export interface CreateNoteInput {
    content: string;
    categoryId: number;
}

export interface UpdateNoteInput {
    noteId: number;
    content: string;
}

export interface SoftDeleteNoteInput {
    categoryIds: number[];
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