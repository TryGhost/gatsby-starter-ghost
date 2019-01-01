import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Prism from 'prismjs'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'

class Post extends React.Component {
    componentDidMount() {
    // TODO: Prism for Webpack currently supports basic languages. `handlebars`,
    // `yaml`, and `json` are not amongst those. To load those languages, you'd
    // need to load them specifically following the webpack instructions here:
    // https://prismjs.com/#examples and https://github.com/mAAdhaTTah/babel-plugin-prismjs
        Prism.highlightAll()
    }

    render() {
        const post = this.props.data.ghostPost

        return (
            <>
                <MetaData
                    data={this.props.data}
                    location={this.props.location}
                    type="article"
                />
                <Layout>
                    <article className="content container">
                        <h1 className="content-title">{post.title}</h1>
                        <section
                            className="content-body load-external-scripts"
                            dangerouslySetInnerHTML={{ __html: post.html }}
                        />
                    </article>
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
