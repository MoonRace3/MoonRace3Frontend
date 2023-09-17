export const transformTextToWithDots = (
  text: string | null = '',
  letter = 4
) => {
  if (!text) return null

  if (text.length <= letter) {
    return text
  }

  const firstPart = text.slice(0, letter)
  const lastPart = text.slice(text.length - letter, text.length + 1)
  return `${firstPart}...${lastPart}`
}
