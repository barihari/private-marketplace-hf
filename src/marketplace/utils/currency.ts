export const formatCurrency = (value: string | number): string => {
  if (!value && value !== 0) return ''
  const numericValue = String(value).replace(/[^0-9]/g, '')
  if (!numericValue) return ''
  const number = parseInt(numericValue, 10)
  return `$${number.toLocaleString('en-US')}`
}

export const stripCurrencyFormatting = (value: string): string => {
  return value.replace(/[^0-9]/g, '')
}

export const handleCurrencyBlur = (value: string, callback: (formatted: string) => void) => {
  const numeric = stripCurrencyFormatting(value)
  if (numeric) callback(formatCurrency(numeric))
}

export const handleCurrencyChange = (value: string, callback: (value: string) => void) => {
  const cleaned = value.replace(/[^0-9$,]/g, '')
  callback(cleaned)
}
