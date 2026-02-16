/**
 * Format a number as US currency without decimals
 * @param value - Number or string to format
 * @returns Formatted currency string (e.g., "$850,000")
 */
export const formatCurrency = (value: string | number): string => {
  if (!value && value !== 0) return ''
  
  // Convert to string and remove non-numeric characters
  const numericValue = String(value).replace(/[^0-9]/g, '')
  
  if (!numericValue) return ''
  
  // Convert to number and format with commas
  const number = parseInt(numericValue, 10)
  
  return `$${number.toLocaleString('en-US')}`
}

/**
 * Strip formatting from currency string to get raw numeric value
 * @param value - Formatted currency string
 * @returns Raw numeric string
 */
export const stripCurrencyFormatting = (value: string): string => {
  return value.replace(/[^0-9]/g, '')
}

/**
 * Handle currency input blur event - formats the value
 * @param value - Current input value
 * @param callback - Function to update the value
 */
export const handleCurrencyBlur = (
  value: string,
  callback: (formatted: string) => void
) => {
  const numeric = stripCurrencyFormatting(value)
  if (numeric) {
    callback(formatCurrency(numeric))
  }
}

/**
 * Handle currency input change event - allows typing
 * @param value - New input value
 * @param callback - Function to update the value
 */
export const handleCurrencyChange = (
  value: string,
  callback: (value: string) => void
) => {
  // Allow $ and numbers only
  const cleaned = value.replace(/[^0-9$,]/g, '')
  callback(cleaned)
}
