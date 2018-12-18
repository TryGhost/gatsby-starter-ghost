import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

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
                {/* TODO: Remove me again. Just here to show possibilities */}
                <div>
                    <p>{humanPageNumber} / {numberOfPages}</p>
                </div>
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
