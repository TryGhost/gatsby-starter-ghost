import React from 'react'
import { Link } from 'gatsby'

import { Logo } from '../.'

const Header = () => (
    <header>
        <nav>
            <div>
                <a href="https://ghost.org">
                    <Logo />
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
