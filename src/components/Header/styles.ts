import { styled } from '../../styles'

export const Container = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',

  '@media screen and (max-width: 1180px)': {
    paddingInline: '2rem',
  },
})

export const CartButton = styled('button', {
  border: 'none',
  borderRadius: 6,
  background: '$gray800',
  padding: '0.75rem',
  cursor: 'pointer',
  transition: 'all .2s',
  position: 'relative',

  '&:hover': {
    filter: 'brightness(1.3)',
  },
})

export const QuantityBadge = styled('div', {
  background: '$green500',
  position: 'absolute',
  top: -7,
  right: -7,

  border: 'solid 3px $gray900',
  borderRadius: '100%',
  width: 29,
  height: 29,
  padding: '4px',

  color: '$white',
  fontWeight: 'bold',
})
