import express from "express"
import { handlePayment } from "../controllers/payment.controller.js"

const router = express.Router()

router.get('/', handlePayment)

export default router