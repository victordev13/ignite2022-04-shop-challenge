import { NextApiRequest, NextApiResponse } from 'next'
import { stripe } from '../../lib/stripe'

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { priceId } = req.body

  if (req.method !== 'POST') {
    return res.status(405)
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Price not found' })
  }

  const checkout = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_APP_URL}/`,
    mode: 'payment',
    line_items: [{ price: priceId, quantity: 1 }],
  })

  return res.status(201).json({ checkoutUrl: checkout.url })
}
