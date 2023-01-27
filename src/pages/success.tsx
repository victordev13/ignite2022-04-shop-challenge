import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import {
  ImageContainer,
  ItemsContainer,
  SuccessContainer,
} from '../styles/pages/success'

interface SuccessProps {
  buyer: {
    name: string
  }
  products: Array<{
    id: string
    name: string
    imageUrl: string
  }>
}

export default function Success({ products, buyer }: SuccessProps) {
  const productsCount = products.length

  return (
    <>
      <Head>
        <title>Compra efetuada 🎉 | Ignite Shop</title>
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada🎉</h1>
        <ItemsContainer>
          {products.map((product) => (
            <ImageContainer key={product.id}>
              <Image
                src={product.imageUrl}
                width={120}
                height={120}
                alt={product.name}
              />
            </ImageContainer>
          ))}
        </ItemsContainer>
        <span>Compra efetuada!</span>
        <p>
          Uhuul <strong>{buyer.name}</strong>,{' '}
          {productsCount > 1
            ? `suas ${productsCount} camisetas já estão`
            : 'sua camiseta já está'}{' '}
          a caminho da sua casa 😁
        </p>

        <Link href="/">Voltar ao catálogo</Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product'],
  })

  if (!session || !session.line_items || !session.customer_details) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const products = session.line_items.data.map((lineItem) => {
    const product = lineItem.price?.product as Stripe.Product

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
    }
  })

  return {
    props: {
      buyer: {
        name: session.customer_details.name,
      },
      products,
    },
  }
}
