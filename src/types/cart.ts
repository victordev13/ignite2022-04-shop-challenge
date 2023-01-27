export type Item = {
  id: string
  quantity: number
  totalAmount: number
  details: {
    name?: string
    imageUrl?: string
    priceId: string
    amount: number
  }
}
