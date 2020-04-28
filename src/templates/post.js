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
                        { post.image && post.image[0] ?
                            <figure className="post-feature-image">
                                <img src={ `${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1280x0/${post.image[0].id}.${post.image[0].extension}` }
                                     alt={ post.name } />
                            </figure> : null }
                        <section className="post-full-content">
                            <h1 className="content-title">{post.name}</h1>
                            <h4>
                                <div>Servings: {post.servings} meals</div>
                                <div>Cooking time: {post.cookingTime} minutes</div>
                            </h4>

                            <hr/>

                            <section
                                className="content-body"
                                dangerouslySetInnerHTML={{ __html: post.description }}
                            />
                            <h2 className="content-title">Ingredients</h2>

                            { post.ingredients !== null ? <section className="content-body">
                                { post.ingredients.map((ingredient, index) => (
                                    <label key="index" className="recipe-ingredients">
                                        <span>
                                            <strong> {ingredient.product} </strong>
                                            ({`${ingredient.amount} ${ingredient.unit}`})
                                        </span>
                                        <input type="checkbox"/>
                                    </label>
                                ))}
                                <p/>
                            </section> : <section className="content-body" />}

                            <h2 className="content-title">Steps</h2>
                            {post.steps !== null ? <section className="content-body">
                                { post.steps.map((step, index) => (
                                    <div className="recipe-step" key={index}>
                                        <div className="recipe-step-index">
                                            <div>{index + 1}</div>
                                        </div>
                                        <div className="recipe-step-data">
                                            <p>
                                                {step.step}</p>

                                            {
                                                step.image && step.image[0] ?
                                                    <img
                                                        src={`${process.env.GATSBY_FLOTIQ_BASE_URL}/image/1280x0/${step.image[0].id}.${step.image[0].extension}`}
                                                        alt={post.name}/> : ''
                                            }

                                        </div>
                                    </div>
                                ))}

                            </section> : <section className="content-body" />}
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
`
