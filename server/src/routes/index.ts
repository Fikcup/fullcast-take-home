import { Router } from "express";
import apiRoutes from "./api"

const router = Router();

// /api
router.use("/api", apiRoutes);

router.use((req, res) => {
    return res.send({
        errorMessage: "Wrong route!",
        errorCode: 400
    });
});

export default router;