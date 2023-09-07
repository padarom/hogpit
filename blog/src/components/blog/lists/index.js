import { graphql } from 'gatsby'

export const query = graphql`
  fragment PostListQuery on FileConnection {
    totalCount
    nodes {
      id
      relativeDirectory
      changeTime(formatString: "MMMM Do, YYYY")
      content: childMdx {
        excerpt
        fields {
          timeToRead { minutes }
        }
        frontmatter {
          title
          updated(formatString: "MMMM Do, YYYY")
          released(formatString: "MMMM Do, YYYY")
          heroImage {
            childImageSharp {
              gatsbyImageData(
                width: 500,
                placeholder: BLURRED,
                formats: [AUTO, WEBP, JPG]
              )
            }
          }
        }
      }
    }
  }
`
