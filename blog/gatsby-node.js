const path = require('path')
const readingTime = require('reading-time')

const postTemplate = path.resolve('./src/templates/BlogPost.js')
const collectionTemplate = path.resolve('./src/templates/CollectionList.js')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Create pages from MDX files
  const { data } = await graphql(`
    {
      allMdx(filter: {internal: {contentFilePath: {regex: "/index.mdx?$/"}}}) {
        nodes {
          id
          internal { contentFilePath }
          parent {
            ... on File {
              relativeDirectory
            }
          }
        }
      }
    }
  `)

  data.allMdx.nodes.forEach(node => {
    createPage({
      path: node.parent.relativeDirectory,
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`,
      context: { id: node.id },
    })
  })

  await Promise.all(['parts', 'posts'].map(async (collection) => {
    const { data } = await graphql(`
      query($collection: String!) {
        posts: allFile(
          filter: {sourceInstanceName: {eq: $collection}, name: {eq: "index"}, extension: {in: ["md", "mdx"]}}
        ) {
          totalCount
        }
      }
    `, { collection })

    const POSTS_PER_PAGE = 9
    const numPages = Math.ceil(data.posts.totalCount / POSTS_PER_PAGE)

    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: `/${collection}/${i + 1}`,
        component: collectionTemplate,
        context: {
          collection,
          currentPage: i + 1,
          numPages,
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
        },
      }) 
    })
  }))
}

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  // Add reading time to MDX nodes
  if (node.internal.type === 'Mdx') {
    createNodeField({
      node,
      name: 'timeToRead',
      value: readingTime(node.body)
    })
  }
}
