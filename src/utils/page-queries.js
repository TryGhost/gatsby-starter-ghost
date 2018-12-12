import { graphql } from 'gatsby'

export const siteMetaFields = graphql`
    fragment SiteMetaFields on Site {
        siteMetadata {
            siteUrl
            title
            description
        }
    }
`

// Used for tag archive pages
export const ghostTagFields = graphql`
    fragment GhostTagFields on GhostTag {
        slug
        name
        visibility
        feature_image
        description
        meta_title
        meta_description
    }
`

// Used for single pages
export const ghostPostFields = graphql`
    fragment GhostPostFields on GhostPost {
        # Main fields
        title
        slug
        featured
        feature_image

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # Dates unformatted
        created_at
        published_at
        updated_at

        # SEO
        custom_excerpt
        meta_title
        meta_description
        og_description
        og_image
        og_title
        twitter_description
        twitter_image
        twitter_title

        # Authors
        author
        authors {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            website
        }
        primary_author {
            name
            slug
            bio
            # email
            profile_image
            twitter
            facebook
            website
        }

        # Tags
        primary_tag {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }
        tags {
            name
            slug
            description
            feature_image
            meta_description
            meta_title
            visibility
        }

        # Content
        plaintext
        html

        # Additional fields
        custom_template
        url
        visibility
        locale
        uuid
        status
        page
        codeinjection_foot
        codeinjection_head
        comment_id
    }
`

// Used for index pages
export const ghostPostListFields = graphql`
    fragment GhostPostListFields on GhostPost {
        id
        slug
        title
        custom_excerpt
        feature_image
        plaintext
        featured

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # Dates unformatted
        created_at
        published_at
        updated_at

        tags {
          name
          slug
        }
        authors {
          name
          slug
        }
    }
`

// Used for tags archive pages
export const ghostTagListFields = graphql`
    fragment GhostTagListFields on GhostPost {
        tags {
          name
          slug
        }
    }
`
