import { HomeContainer, ProductContainer } from '../styles/pages/home'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import { stripe } from '../lib/stripe'
import { GetStaticProps } from 'next'
import Stripe from 'stripe'
import Link from 'next/link'
import { formatMoney } from '../utils/money'

import 'keen-slider/keen-slider.min.css'
import Head from 'next/head'

interface Product {
  id: string
  name: string
  imageUrl: string
  formattedPrice: string
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

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map((p) => (
          <Link href={'/products/' + p.id} key={p.id} prefetch={false}>
            <ProductContainer className="keen-slider__slide">
              <Image src={p.imageUrl} width={520} height={480} alt={p.name} />
              <footer>
                <strong>{p.name}</strong>
                <span>{p.formattedPrice}</span>
              </footer>
            </ProductContainer>
          </Link>
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
    }
  })

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 2, // 2h
  }
}
