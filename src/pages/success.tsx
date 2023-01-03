import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'
import { stripe } from '../lib/stripe'
import { ImageContainer, SuccessContainer } from '../styles/pages/success'

interface SuccessProps {
  buyer: {
    name: string
  }
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({ product, buyer }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada 🎉 | Ignite Shop</title>
      </Head>
      <SuccessContainer>
        <h1>Compra efetuada🎉</h1>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={127}
            height={145}
            alt={product.name}
          />
        </ImageContainer>
        <p>
          Opaaa <strong>{buyer.name}</strong>, seu pedido já está a caminho!
          <br />
          Logo você receberá <strong>{product.name}</strong> em sua casa!😁
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

  const product = session.line_items.data[0].price?.product as Stripe.Product

  return {
    props: {
      buyer: {
        name: session.customer_details.name,
      },
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  }
}
