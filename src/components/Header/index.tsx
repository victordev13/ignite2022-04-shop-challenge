import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import logoImg from '../../assets/logo.svg'
import { CartContext } from '../../contexts/Cart'
import { CartButton, Container, QuantityBadge } from './styles'

export default function Header() {
  const { toggleShowCart, quantity } = useContextSelector(
    CartContext,
    ({ toggleShowCart, quantity }) => {
      return {
        toggleShowCart,
        quantity,
      }
    },
  )

  return (
    <Container>
      <Link href="/">
        <img src={logoImg.src} alt="" />
      </Link>
      <CartButton onClick={() => toggleShowCart()} title="Minha sacola">
        <Handbag size={32} color="white" weight="bold" />
        {quantity > 0 && <QuantityBadge>{quantity}</QuantityBadge>}
      </CartButton>
    </Container>
  )
}
