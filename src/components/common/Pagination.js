import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath } = pageContext

    return (
        <nav role="navigation">
            <div>
                {previousPagePath && (
                    <div>
                        <Link to={previousPagePath} rel="prev">
                            Previous
                        </Link>
                    </div>
                )}
                {nextPagePath && (
                    <div>
                        <Link to={nextPagePath} rel="next">
                            Next
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}

Pagination.propTypes = {
    pageContext: PropTypes.object.isRequired,
}

export default Pagination
