import Image from 'next/image'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '../../contexts/Cart'
import { Item } from '../../types/cart'
import { formatMoneyFromInt } from '../../utils/money'
import { CartItemContainer, CartItemDetails, EmptyImage } from './styles'

export default function CartItem({ item }: { item: Item }) {
  const { removeItem } = useContextSelector(CartContext, ({ removeItem }) => {
    return { removeItem }
  })

  function handleRemoveItem() {
    removeItem(item)
  }

  return (
    <CartItemContainer>
      {item.details.imageUrl ? (
        <Image
          src={item.details.imageUrl}
          width={520}
          height={480}
          alt={item.details.name ?? ''}
        />
      ) : (
        <EmptyImage />
      )}
      <CartItemDetails>
        <p>{item.details.name}</p>
        <span>{formatMoneyFromInt(item.totalAmount)}</span>
        <a
          title={`Remover ${item.details.name} da sacola`}
          onClick={() => handleRemoveItem()}
        >
          Remover
        </a>
      </CartItemDetails>
    </CartItemContainer>
  )
}
