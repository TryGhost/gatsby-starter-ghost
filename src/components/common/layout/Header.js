import React from 'react'
import { Link } from 'gatsby'

const Header = () => (
    <header>
        <nav>
            <div>
                <a href="https://ghost.org">
                    <img src="/assets/ghost-icon.png" />
                </a>
                <Link to="/" >Home</Link>
            </div>
            <div>
                <Link to="#">Page 1</Link>
                <Link to="#">Page 2</Link>
                <Link to="#">Page 3</Link>
            </div>
        </nav>
    </header>
)

export default Header
