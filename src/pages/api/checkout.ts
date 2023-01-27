import { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { stripe } from '../../lib/stripe'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405)
  }

  const productsPayloadSchema = z.object({
    products: z.array(
      z.object({
        priceId: z.string(),
      }),
    ),
  })

  const { products } = productsPayloadSchema.parse(req.body)

  const checkout = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_APP_URL}/`,
    mode: 'payment',
    line_items: products.map((product) => {
      return { price: product.priceId, quantity: 1 }
    }),
  })

  return res.status(201).json({ checkoutUrl: checkout.url })
}
