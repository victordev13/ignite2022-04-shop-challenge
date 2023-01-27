import { styled } from '@stitches/react'

export const Overlay = styled('div', {
  background: 'black',
  opacity: '.4',
  width: '100vw',
  height: '100vh',
  position: 'absolute',
})

export const CartContainer = styled('div', {
  zIndex: '999',
  position: 'fixed',
  maxWidth: '33.33vw',
  minWidth: '400px',
  width: '100%',
  height: '100vh',
  right: 0,
  background: '$gray800',
  padding: '4.5rem 3rem',
  boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',

  header: {
    color: '$gray100',
    fontWeight: 700,
    fontSize: '$lg',
  },
})

export const CloseButton = styled('button', {
  position: 'absolute',
  top: '1.8rem',
  right: '1.8rem',
  background: 'transparent',
  color: '$white',
  border: 'none',
  cursor: 'pointer',
  transition: 'all .2s',

  '&:hover': {
    color: '$gray300',
  },
})

export const CartItemsContainer = styled('div', {
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
})

export const CartFooterDetails = styled('footer', {
  position: 'absolute',
  bottom: '3rem',
  left: '3rem',
  right: '3rem',

  '& > div': {
    display: 'flex',
    justifyContent: 'space-between',
    lineHeight: '2rem',
  },

  '& div:nth-child(2)': {
    fontSize: '$lg',
    fontWeight: 700,
    marginBottom: '3rem',
  },
})
