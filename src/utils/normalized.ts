export default function normalizedText(text: string) {
  const textNormalized = text?.normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return textNormalized
}
