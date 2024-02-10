export interface Category {
    categoryId: number; // pk
    parentCategoryId: number | null; // fk
    categoryName: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};

export interface SortedCategory extends Category {
    children?: Category[];
}