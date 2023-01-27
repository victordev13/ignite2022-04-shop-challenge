import { X } from 'phosphor-react'
import { useState } from 'react'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '../../contexts/Cart'
import { formatMoneyFromInt } from '../../utils/money'
import { Button } from '../Button'
import CartItem from '../CartItem'
import {
  CartContainer,
  CartFooterDetails,
  CartItemsContainer,
  CloseButton,
  Overlay,
} from './styles'

export default function Cart() {
  const [loadingCheckout, setLoadingCheckout] = useState(false)

  const { items, quantity, totalAmount, closeCart, goToCheckout } =
    useContextSelector(CartContext, (ctx) => {
      return {
        items: ctx.items,
        quantity: ctx.quantity,
        totalAmount: ctx.totalAmount,
        closeCart: ctx.closeCart,
        goToCheckout: ctx.goToCheckout,
      }
    })

  async function handleCheckout() {
    setLoadingCheckout(true)
    try {
      await goToCheckout()
    } catch (err) {
      console.log(err)
      setLoadingCheckout(false)
    }
  }

  const hasItems = items.length !== 0

  return (
    <>
      <Overlay onClick={() => closeCart()} />
      <CartContainer>
        <CloseButton onClick={() => closeCart()}>
          <X weight="regular" size={32} />
        </CloseButton>
        {!hasItems ? (
          <>
            <p>Ainda não temos nada aqui</p>
            <br />
            <span>Vamos às compras? 😀</span>
          </>
        ) : (
          <>
            <header>
              <span>Sacola de Compras</span>
            </header>
            <CartItemsContainer>
              {items.map((item) => (
                <CartItem item={item} key={item.id} />
              ))}
            </CartItemsContainer>
            <CartFooterDetails>
              <div>
                <p>Quantidade</p>
                <span>{quantity} itens</span>
              </div>
              <div>
                <p>Valor total</p>
                <span>{formatMoneyFromInt(totalAmount)}</span>
              </div>
              <div>
                <Button onClick={() => handleCheckout()}>
                  {loadingCheckout
                    ? 'Carregando checkout...'
                    : 'Finalizar compra'}
                </Button>
              </div>
            </CartFooterDetails>
          </>
        )}
      </CartContainer>
    </>
  )
}
