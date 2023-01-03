import axios from 'axios'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Stripe from 'stripe'
import { stripe } from '../../lib/stripe'
import {
  ImageContainer,
  ProductContainer,
  ProductDetailsContainer,
} from '../../styles/pages/product'
import { formatMoney } from '../../utils/money'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    formattedPrice: string
    description: string
    priceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const [loadingCheckout, setLoadingCheckout] = useState(false)

  const { isFallback } = useRouter()

  if (isFallback) {
    return <p>loading...</p>
  }

  async function handleCheckout() {
    setLoadingCheckout(true)
    try {
      const { data } = await axios.post<{ checkoutUrl: string }>(
        '/api/checkout',
        {
          priceId: product.priceId,
        },
      )

      window.location.href = data.checkoutUrl
    } catch (err) {
      console.log(err)
      setLoadingCheckout(false)
    }
  }

  return (
    <>
      <Head>
        <title>{`${product.name} | Ignite Shop`}</title>
      </Head>
      <ProductContainer>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            width={520}
            height={480}
            alt={product.name}
          />
        </ImageContainer>
        <ProductDetailsContainer>
          <h1>{product.name}</h1>
          <span>{product.formattedPrice}</span>

          <p>{product.description}</p>

          <button onClick={() => handleCheckout()} disabled={loadingCheckout}>
            {loadingCheckout
              ? 'Redirecionando para o Checkout...'
              : 'Comprar agora'}
          </button>
        </ProductDetailsContainer>
      </ProductContainer>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [{ params: { id: 'prod_N2iJLiAbkXoOcu' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({
  params,
}) => {
  if (!params) {
    return {
      notFound: true,
    }
  }

  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: productId,
        name: product.name,
        imageUrl: product.images[0],
        formattedPrice: formatMoney((price.unit_amount as number) / 100),
        description: product.description,
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1h
  }
}
