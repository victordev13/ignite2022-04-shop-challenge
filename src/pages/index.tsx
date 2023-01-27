import {
  AddToCartButton,
  HomeContainer,
  ProductContainer,
} from '../styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import { formatMoney } from '../utils/money'

import 'keen-slider/keen-slider.min.css'
import Head from 'next/head'
import { Handbag } from 'phosphor-react'
import { useContextSelector } from 'use-context-selector'
import { CartContext } from '../contexts/Cart'
import React from 'react'

interface Product {
  id: string
  name: string
  imageUrl: string
  formattedPrice: string
  intPrice: number
  priceId: string
}

interface Props {
  products: Product[]
}

export default function Home({ products }: Props) {
  const [sliderRef] = useKeenSlider({
    slides: {
      //
    },
    breakpoints: {
      '(min-width: 320px)': {
        slides: { perView: 1, spacing: 16 },
      },
      '(min-width: 580px)': {
        slides: { perView: 2, spacing: 32 },
      },
      '(min-width: 920px)': {
        slides: { perView: 3, spacing: 32 },
      },
    },
  })

  const { addItem } = useContextSelector(CartContext, (ctx) => {
    return {
      addItem: ctx.addItem,
    }
  })

  function handleAddToCard(priceId: string) {
    const product = products.find((p) => p.priceId === priceId)
    if (!product) return

    addItem({
      amount: product.intPrice,
      priceId: product.priceId,
      quantity: 1,
      details: {
        name: product.name,
        imageUrl: product.imageUrl,
      },
    })
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((p) => (
          <React.Fragment key={p.id}>
            <ProductContainer className="keen-slider__slide">
              <Link href={'/products/' + p.id} key={p.id} prefetch={false}>
                <Image src={p.imageUrl} width={520} height={480} alt={p.name} />
              </Link>
              <footer>
                <div>
                  <strong>{p.name}</strong>
                  <span>{p.formattedPrice}</span>
                </div>
                <AddToCartButton onClick={() => handleAddToCard(p.priceId)}>
                  <Handbag size={32} color="white" weight="bold" />
                </AddToCartButton>
              </footer>
            </ProductContainer>
          </React.Fragment>
        ))}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
    active: true,
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      formattedPrice: formatMoney((price.unit_amount as number) / 100),
      intPrice: price.unit_amount,
      priceId: price.id,
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2h
  }
}
