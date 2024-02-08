import { Router } from "express";
import noteRoutes from "./note-routes";
import categoryRoutes from "./category-routes";

const router = Router();

// /api/notes
router.use("/notes", noteRoutes);

// /api/categories
router.use("/categories", categoryRoutes);

export default router;