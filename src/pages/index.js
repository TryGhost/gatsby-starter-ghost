import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const IndexPage = () => (
    <Layout>
        <div className="container">
            <article className="content" style={{ textAlign: `center` }}>
                <h1 className="content-title">Paddybasi.com</h1>
                <section className="content-body">
                    Welcome
                </section>
            </article>
        </div>
    </Layout>
)

export default IndexPage
