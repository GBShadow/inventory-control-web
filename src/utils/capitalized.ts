export default function capitalized(word: string) {
  if (!word) {
    return ' '
  }
  return word.replace(/^\w/, c => c.toUpperCase())
}
