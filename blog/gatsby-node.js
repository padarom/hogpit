const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')
const readingTime = require('reading-time')
const slugify = require('@sindresorhus/slugify')

const postTemplate = path.resolve('./src/templates/Post.js')

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
