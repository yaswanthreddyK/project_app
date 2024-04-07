import express from "express";
import { createOffer, editOffer, getAllActiveOffers, getAllContracts } from "../controllers/offer.controller.js";
const router = express.Router()


router.get('/getOffers',getAllActiveOffers)
router.get('/getContracts', getAllContracts)
router.post('/createOffer',createOffer)
router.patch('/editOffer',editOffer)

export default router
