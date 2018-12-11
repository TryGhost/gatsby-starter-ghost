import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Prism from 'prismjs'

import { Layout } from '../components/common/layout'
// import { MetaData } from '../components/common/meta'

class Post extends React.Component {
    componentDidMount() {
    // TODO: Prism for Webpack currently supports basic languages. `handlebars`,
    // `yaml`, and `json` are not amongst those. To load those languages, we'd
    // need to load them specifically following the webpack instructions here:
    // https://prismjs.com/#examples and https://github.com/mAAdhaTTah/babel-plugin-prismjs
    // The other option is to create a plugin for GhostPosts.
        Prism.highlightAll()
    }

    render() {
        const post = this.props.data.ghostPost
        const image = post.feature_image || ``

        return (
      <>
        {/* <MetaData
            data={this.props.data}
            location={this.props.location}
            type="article"
            image={image}
        /> */}
        <Layout>
            <div>
                <article>
                    <h1>{post.title}</h1>
                    <section
                        className="post-content external-scripts"
                        dangerouslySetInnerHTML={{ __html: post.html }}
                    />
                </article>
            </div>
        </Layout>
      </>
        )
    }
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
        ghostPost(slug: { eq: $slug }) {
            ...GhostPostFields
        }
    }
`
