/** Formats Ukrainian phone as +38 (0XX) XXX XX XX */
export function formatUaPhone(input: string): string {
  let digits = input.replace(/\D/g, '')

  if (digits.startsWith('380')) {
    digits = digits.slice(0, 12)
  } else if (digits.startsWith('38')) {
    digits = digits.slice(0, 12)
  } else if (digits.startsWith('0')) {
    digits = ('38' + digits).slice(0, 12)
  } else if (digits.length > 0) {
    digits = ('380' + digits).slice(0, 12)
  } else {
    return ''
  }

  const rest = digits.slice(2) // after country code 38
  let result = '+38'

  if (rest.length === 0) return result

  result += ` (${rest.slice(0, Math.min(3, rest.length))}`
  if (rest.length <= 3) return result

  result += `) ${rest.slice(3, Math.min(6, rest.length))}`
  if (rest.length <= 6) return result

  result += ` ${rest.slice(6, Math.min(8, rest.length))}`
  if (rest.length <= 8) return result

  result += ` ${rest.slice(8, Math.min(10, rest.length))}`
  return result
}

export function isCompleteUaPhone(phone: string): boolean {
  return phone.replace(/\D/g, '').length === 12
}
