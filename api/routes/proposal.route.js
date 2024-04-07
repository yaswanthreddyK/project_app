import express from "express";
import { createProposal, deleteProposal, editProposal, getAllProposals, getListOfProposals } from "../controllers/proposal.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = express.Router()

router.get('/', getAllProposals)
router.post('/', getListOfProposals)
router.post('/createProposal',upload.single("resume"), createProposal)
router.patch('/editProposal',editProposal)
router.delete('/deleteProposal',deleteProposal)

export default router