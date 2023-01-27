import type { AppProps } from 'next/app'
import Header from '../components/Header'
import { CartContextProvider } from '../contexts/Cart'
import { globalStyles } from '../styles/global'
import { Container } from '../styles/pages/app'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container>
      <CartContextProvider>
        <Header />
        <Component {...pageProps} />
      </CartContextProvider>
    </Container>
  )
}
