import { styled } from '..'

export const ErrorContainer = styled('div', {
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',

  p: {
    lineHeight: 6,
    fontSize: '$lg',
  },

  a: {
    textDecoration: 'none',
    textAlign: 'center',
    marginTop: 'auto',
    backgroundColor: '$green500',
    border: 0,
    color: '$white',
    borderRadius: 8,
    padding: '1.25rem',
    cursor: 'pointer',
    fontWeight: 'bold',

    '&:not(:disabled):hover': {
      backgroundColor: '$green300',
    },

    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
  },
})
