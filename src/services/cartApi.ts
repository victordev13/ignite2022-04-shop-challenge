import { Item } from '../types/cart'
import z from 'zod'

const STORAGE_KEY = '@igniteshop'

function updateItems(items: Item[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
}

function addItem(item: Item) {
  updateItems([...getItems(), item])
}

function removeItem(item: Item) {
  updateItems(getItems().filter((curr) => curr.id !== item.id))
}

function getItems(): Item[] {
  const storagedData = localStorage.getItem(STORAGE_KEY)
  if (!storagedData) {
    return []
  }

  const itemsSchema = z.array(
    z.object({
      id: z.string(),
      totalAmount: z.number(),
      quantity: z.number(),
      details: z.object({
        priceId: z.string(),
        amount: z.number(),
        imageUrl: z.string(),
        name: z.string(),
      }),
    }),
  )
  try {
    return itemsSchema.parse(JSON.parse(storagedData || '{}'))
  } catch (error) {
    return []
  }
}

export const cartApi = {
  addItem,
  getItems,
  removeItem,
}
