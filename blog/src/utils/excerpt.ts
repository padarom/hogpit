import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

export const createExcerpt = (body: string, length: number = 170) => {
  const excerpt = parser
    .render(body)
    .split('\n')
    .slice(0, 6)
    .map((str: string) => str.replace(/<\/?[^>]+(>|$)/g, '').split('\n'))
    .flat()
    .join(' ')

  // TODO: Split after full word, not just within word.
  if (excerpt.length > length) {
    const trimmedExcerpt = excerpt.slice(0, length)
    const lastSpaceIndex = trimmedExcerpt.lastIndexOf(' ')

    // Ensure we don't cut off mid-word
    return trimmedExcerpt.slice(0, lastSpaceIndex) + ' ...'
  }

  return excerpt
}
