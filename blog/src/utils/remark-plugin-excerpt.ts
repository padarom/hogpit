import { visit } from 'unist-util-visit'
import { valueToEstree } from 'estree-util-value-to-estree'

type Length = [string, number]

export default function remarkPluginExcerpt({
  lengths = [['short', 140], ['longer', 280]] as Length[],
  ellipsis = '...',
  name = 'excerpt',
} = {}) {
  return function (tree, file) {
    let text = ''

    visit(tree, ['text', 'code'], (node) => {
      text += node.value
    })

    const excerpts = lengths.reduce<Record<string, string>>((excerpts, length: Length) => {
      excerpts[length[0]] = text.slice(0, length[1]) + ellipsis
      return excerpts
    }, {})

    tree.children.unshift({
      type: 'mdxjsEsm',
      data: {
        estree: {
          type: 'Program',
          sourceType: 'module',
          body: [
            {
              type: 'ExportNamedDeclaration',
              source: null,
              specifiers: [],
              declaration: {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: { type: 'Identifier', name },
                    init: valueToEstree(excerpts),
                  },
                ],
              },
            },
          ],
        },
      },
    })
  }
}
