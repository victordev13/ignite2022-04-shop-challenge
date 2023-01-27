const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export const formatMoney = (val: number) => formatter.format(val)
export const formatMoneyFromInt = (val: number) => formatter.format(val / 100)
