import { styled } from '..'

export const SuccessContainer = styled('main', {
  width: '100%',

  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100',
  },

  p: {
    fontSize: '$lg',
    color: '$gray300',
    maxWidth: 640,
    textAlign: 'center',
    marginTop: '1rem',
    lineHeight: 1.4,
  },

  span: {
    fontSize: '$xl',
    fontWeight: 'bold',
    marginTop: '2rem',
    lineHeight: 1.4,
  },

  a: {
    fontSize: 'large',
    display: 'block',
    marginTop: '5rem',
    fontWeight: 'bold',
    color: '$green500',
    textDecoration: 'none',

    '&:hover': {
      color: '$green300',
    },
  },
})

export const ImageContainer = styled('div', {
  width: 140,
  height: 140,
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: '50%',
  padding: '0.5rem',

  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  marginLeft: '-3rem',
  boxShadow: '0px 0px 60px rgba(0, 0, 0, 0.8)',

  img: {
    objectFit: 'cover',
  },
})

export const ItemsContainer = styled('div', {
  marginTop: '4rem',
  display: 'flex',
  marginRight: '-3rem',
})
