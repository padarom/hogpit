module.exports = {
  siteMetadata: {
    title: 'Hogpit',
  },
  trailingSlash: 'never',
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    // 'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'righteous:400',
          'roboto:300,400,500,600',
          'merriweather',
          'Roboto Mono',
        ],
        display: 'swap'
      }
    },
    {
      resolve: 'gatsby-plugin-disqus',
      options: {
        shortname: 'hogpit',
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'parts',
        path: './content/parts/',
        fastHash: true,
      },
      __key: 'parts',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './content/images/',
        fastHash: true,
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: './content/posts/',
        fastHash: true,
      },
      __key: 'posts',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'authors',
        path: './content/authors/',
        fastHash: true,
      },
      __key: 'authors',
    },
  ],
};
