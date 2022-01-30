export const formatValue = (value: string | number) =>
  Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRl',
  }).format(Number(value))
