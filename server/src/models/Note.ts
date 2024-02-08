export interface Note {
    noteId: number; // pk
    title: string;
    content: string;
    categoryId: number; // fk
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
};