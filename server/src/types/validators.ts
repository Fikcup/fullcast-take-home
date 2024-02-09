import { body } from "express-validator";

export const validateChangeNoteInput = [
    body("content").isString(),
    body("categoryId").isInt({ min: 0 }),
];

export const validateChangeCategoryInput = [
    body("categoryName").isString().notEmpty(),
    body("parentCategoryId").isInt({ min: 0 }).optional(),
];