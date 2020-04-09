import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/common'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data }) => {
    const post = data.recipe

    return (
        <>
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        { post.image ?
                            <figure className="post-feature-image">
                                <img src={ `${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1280x0/${post.image[0].id}.${post.image[0].extension}` }
                                     alt={ post.name } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.name}</h1>
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.description }}
                            />
                            <h2 className="content-title">Ingredients</h2>
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.ingredients }}
                            />

                            <h2 className="content-title">Steps</h2>
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.steps }}
                            />
                        </section>
                    </article>
                </div>
            </Layout>
        </>
    )
}

export default Post

export const recipeQuery = graphql`
    query RecipeBySlug($slug: String!) {
        recipe(slug: { eq: $slug }) {
          id
          name
          slug
          description
          ingredients
          steps
          cookingTime
          servings
          image {
            extension
            id
          }
        }
    }
`
