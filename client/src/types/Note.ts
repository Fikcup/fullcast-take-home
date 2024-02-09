export interface Note {
    noteId: number; // pk
    content: string;
    categoryId: number; // fk
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};