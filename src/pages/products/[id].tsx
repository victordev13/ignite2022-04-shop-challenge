import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Stripe from 'stripe'
import { useContextSelector } from 'use-context-selector'
import { Button } from '../../components/Button'
import { CartContext } from '../../contexts/Cart'
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
    intPrice: number
    priceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  const { addItem, openCart, hasItem } = useContextSelector(
    CartContext,
    (ctx) => {
      return {
        addItem: ctx.addItem,
        openCart: ctx.openCart,
        hasItem: ctx.hasItem,
      }
    },
  )

  if (isFallback) {
    return <p>loading...</p>
  }

  function handleAddItemToCard() {
    addItem({
      amount: product.intPrice,
      priceId: product.priceId,
      quantity: 1,
      details: {
        name: product.name,
        imageUrl: product.imageUrl,
      },
    })

    setTimeout(() => openCart(), 200)
  }

  const itemExistsInCart = hasItem(product.priceId)

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

          <Button
            onClick={() => handleAddItemToCard()}
            disabled={itemExistsInCart}
          >
            {itemExistsInCart ? 'Já está na sua sacola' : ' Colocar na sacola'}
          </Button>
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
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        formattedPrice: formatMoney((price.unit_amount as number) / 100),
        description: product.description,
        intPrice: price.unit_amount,
        priceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1h
  }
}
