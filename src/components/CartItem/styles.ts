import { styled } from '../../styles'

export const CartItemContainer = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  img: {
    width: '93px',
    height: '93px',
    backgroundColor: '$gray300',

    borderRadius: 8,
  },
})

export const CartItemDetails = styled('div', {
  lineHeight: '2rem',

  span: {
    fontWeight: '700',
  },

  a: {
    display: 'block',
    fontWeight: '700',
    color: '$green500',
    fontSize: '$sm',
    cursor: 'pointer',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const EmptyImage = styled('div', {
  width: '93px',
  height: '93px',
  backgroundColor: '$gray300',
  borderRadius: 8,
})
