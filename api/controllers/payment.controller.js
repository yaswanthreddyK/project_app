import Stripe from "stripe"
import Store from "../models/store.model.js"
import ApiResponse from "../utils/ApiResponse.js"

export async function handlePayment(req, res){
    try {
        req.body.item_Id = "660bc08bb8ced525de83f2fd"
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const storeItem = await Store.findById(req.body.item_Id)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [{
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: storeItem.item_title
                    },
                    unit_amount: storeItem.priceInPounds
                },
                quantity: 1
            }],
            success_url: "http://localhost:5173/profile/payments?success=true",
            cancel_url: "http://localhost:5173/profile/payments?success=false",
        })

        return res.json({url: session.url})
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiResponse('Error', 500))
    }
}