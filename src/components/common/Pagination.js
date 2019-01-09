import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const Pagination = ({ pageContext }) => {
    const { previousPagePath, nextPagePath, humanPageNumber, numberOfPages } = pageContext

    return (
        <nav className="pagination" role="navigation">
            <div>
                {previousPagePath && (
                    <div>
                        <Link to={previousPagePath} rel="prev">
                            Previous
                        </Link>
                    </div>
                )}
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
