import MarkdownIt from 'markdown-it'
const parser = new MarkdownIt()

const WORDS_PER_MINUTE = 150

export const calculateReadTime = (body: string): string => {
  const excerpt = parser
    .render(body)
    .split('\n')
    .slice(0, 6)
    .map((str: string) => str.replace(/<\/?[^>]+(>|$)/g, '').split('\n'))
    .flat()
    .join(' ')
    .split(' ')

  return (excerpt.length / WORDS_PER_MINUTE).toFixed(0)
}
