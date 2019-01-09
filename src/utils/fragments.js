import { graphql } from 'gatsby'

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

// Used for author pages
export const ghostAuthorFields = graphql`
    fragment GhostAuthorFields on GhostAuthor {
        slug
        name
        bio
        cover_image
        profile_image
        location
        website
        twitter
        facebook
    }
`

// Used for single posts
export const ghostPostFields = graphql`
    fragment GhostPostFields on GhostPost {
        # Main fields
        id
        title
        slug
        featured
        feature_image
        excerpt

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # Dates unformatted
        created_at
        published_at
        updated_at

        # SEO
        # excerpt
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
        url
        uuid
        page
        codeinjection_foot
        codeinjection_head
        comment_id
    }
`

// Used for single pages
export const ghostPageFields = graphql`
    fragment GhostPageFields on GhostPage {
        # Main fields
        title
        slug
        featured
        feature_image
        excerpt

        # Dates formatted
        created_at_pretty: created_at(formatString: "DD MMMM, YYYY")
        published_at_pretty: published_at(formatString: "DD MMMM, YYYY")
        updated_at_pretty: updated_at(formatString: "DD MMMM, YYYY")

        # Dates unformatted
        created_at
        published_at
        updated_at

        # SEO
        # excerpt
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
        url
        uuid
        page
        codeinjection_foot
        codeinjection_head
        comment_id
    }
`

// Used for settings
export const ghostSetttingsFields = graphql`
    fragment GhostSetttingsFields on GhostSettings {
        title
        description
        logo
        # icon
        cover_image
        facebook
        twitter
        lang
        timezone
        # ghost_head
        # ghost_food
        navigation {
            label
            url
        }
    }
`
