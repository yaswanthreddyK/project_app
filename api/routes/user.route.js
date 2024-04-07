import express from "express";
import {
  getAllProfessionals,
  getAllCompanies,
  editUser,
  getCurrentUser,
  searchFilter,
  getSingleUser,
  getRecommendedProfessionals,
  getRecommendedCompanies,
  getStats,
  getSearchSummary,
  logout,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router();

router.get("/professionals", getAllProfessionals);
router.get("/companies", getAllCompanies);
router.get("/currentUser", getCurrentUser);
router.patch("/editUser", upload.single("profileImage"), editUser);
router.post("/getUser", getSingleUser);
router.post("/search", searchFilter);
router.post('/searchSummary', getSearchSummary)
router.post("/recommendedProfessionals", getRecommendedProfessionals)
router.post("/recommendedCompanies", getRecommendedCompanies)
router.get('/stats', getStats)
router.get('/logout',logout)
export default router;
