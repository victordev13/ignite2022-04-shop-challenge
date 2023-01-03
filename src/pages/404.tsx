import Link from 'next/link'
import { globalStyles } from '../styles/global'
import { ErrorContainer } from '../styles/pages/404'

globalStyles()

export default function Error404() {
  return (
    <ErrorContainer>
      <p>🙈 Ops, chegou aqui por engano né?</p>
      <Link href="/">Me leve para o lugar certo</Link>
    </ErrorContainer>
  )
}
