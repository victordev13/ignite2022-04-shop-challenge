import Link from 'next/link'
import logoImg from '../../assets/logo.svg'
import { Container } from './styles'

export default function Header() {
  return (
    <Container>
      <Link href="/">
        <img src={logoImg.src} alt="" />
      </Link>
    </Container>
  )
}
