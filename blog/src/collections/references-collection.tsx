import {type BlogPost, blogPostsCollection} from './blog-posts-collection'

export const referencesCollection = Object.values(blogPostsCollection).reduce((final, post) => {
  post.meta.references.forEach((reference) => {
    if (typeof final[reference] === 'undefined') final[reference] = []
    final[reference].push({
      title: post.title,
      slug: post.slug,
      ...post.meta
    })
  })
  
  return final
}, {} as Record<string, any[]>)
