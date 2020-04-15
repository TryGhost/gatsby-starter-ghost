import React from 'react'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'

/**
* Main index page (home page)
* Loads all posts
*
*/
const Index = ({ data, pageContext }) => {
    const recipes = data.allRecipe.edges

    return (
        <>
            <Layout isHome={true}>
                <div className="container">
                    <section className="post-feed">
                        {recipes.map(({ node }) => (
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section>
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}


export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query {
    allRecipe(sort: {fields: flotiqInternal___createdAt, order: DESC}) {
      edges {
        node {
          id
          name
          slug
          description
          ingredients {
            amount
            unit
            product
          }
          steps {
            step
            image {
              extension
              id
            }
          }
          cookingTime
          servings
          image {
            extension
            id
          }
        }
      }
    }
  }
`
