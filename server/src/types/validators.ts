import { body } from "express-validator";

export const validateCreateNoteInput = [
    body("content").isString(),
    body("categoryId").isInt({ min: 0 }),
];

export const validateUpdateNoteInput = [
    body("noteId").isInt({ min: 0 }),
    body("content").isString(),
];

export const validateSoftDeleteNoteInput = [
    body("categoryId").isInt({ min: 0 }),
];

export const validateCreateCategoryInput = [
    body("categoryName").isString().notEmpty(),
    body("parentCategoryId").isInt({ min: 0 }).optional(),
];

export const validateUpdateCategoryInput = [
    body("categoryId").isInt({ min: 0 }),
    body("categoryName").isString().notEmpty().optional(),
    body("parentCategoryId").isInt({ min: 0 }).optional(),
];

export const validateSoftDeleteCategoryInput = [
    body("categoryId").isInt({ min: 0 }),
];