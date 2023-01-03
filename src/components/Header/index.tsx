import Link from 'next/link'
import { Handbag } from 'phosphor-react'
import logoImg from '../../assets/logo.svg'
import { CartButton, Container, QuantityBadge } from './styles'

export default function Header() {
  const quantity = 1

  return (
    <Container>
      <Link href="/">
        <img src={logoImg.src} alt="" />
      </Link>
      <CartButton>
        <Handbag size={32} color="white" weight="bold" />
        {quantity > 0 && <QuantityBadge>{quantity}</QuantityBadge>}
      </CartButton>
    </Container>
  )
}
