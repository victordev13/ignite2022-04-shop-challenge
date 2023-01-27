import axios from 'axios'
import { ReactNode, useState } from 'react'
import { createContext } from 'use-context-selector'
import Cart from '../components/Cart'
import { Item } from '../types/cart'

type ItemToAddToCart = {
  quantity: number
  priceId: string
  amount: number
  details: {
    imageUrl: string
    name: string
  }
}

type CartContextProps = {
  addItem: (item: ItemToAddToCart) => void
  removeItem: (item: Item) => void
  hasItem: (priceId: string) => boolean
  closeCart: () => void
  openCart: () => void
  goToCheckout: () => Promise<void>
  items: Item[]
  toggleShowCart: () => void
  quantity: number
  totalAmount: number
  isOpen: boolean
}

type CartContextProviderProps = {
  children: ReactNode
}

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps,
)

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  function addItem(item: ItemToAddToCart): void {
    if (hasItem(item.priceId)) {
      alert('Ops, você já tem um item desse na sua sacola 😁')
      return
    }

    setItems((state) => [
      ...state,
      {
        id: Date.now().toString(),
        totalAmount: item.amount * item.quantity,
        quantity: item.quantity,
        details: {
          priceId: item.priceId,
          amount: item.amount,
          imageUrl: item.details.imageUrl,
          name: item.details.name,
        },
      },
    ])
  }

  function removeItem(item: Item): void {
    setItems((state) => state.filter((s) => s.id !== item.id))
  }

  function hasItem(priceId: string): boolean {
    return !!items.find((item) => item.details.priceId === priceId)
  }

  function closeCart(): void {
    setIsOpen(false)
  }

  function openCart(): void {
    setIsOpen(true)
  }

  function toggleShowCart(): void {
    setIsOpen(!isOpen)
  }

  async function goToCheckout(): Promise<void> {
    const { data } = await axios.post<{ checkoutUrl: string }>(
      '/api/checkout',
      {
        products: items.map((item) => {
          return { priceId: item.details.priceId }
        }),
      },
    )

    window.location.href = data.checkoutUrl
  }

  const quantity = items.reduce((acc, curr) => acc + curr.quantity, 0)
  const totalAmount = items.reduce((acc, curr) => acc + curr.details.amount, 0)

  return (
    <CartContext.Provider
      value={{
        addItem,
        removeItem,
        hasItem,
        closeCart,
        openCart,
        toggleShowCart,
        goToCheckout,
        quantity,
        totalAmount,
        isOpen,
        items,
      }}
    >
      {children}
      {isOpen && <Cart />}
    </CartContext.Provider>
  )
}
