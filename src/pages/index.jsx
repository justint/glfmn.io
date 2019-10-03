import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import Pane, { Title,  LineBox } from "../components/pane"
import SEO from "../components/seo"

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <Pane foot='test.txt'>
            <Title title='Test title' author='Gwen Lofman' date='2019-10-02'>
                Excerpt from the article
            </Title>
        </Pane>
        <Pane foot='hello.md'>
            <LineBox title='Hello World'>

            </LineBox>
        </Pane>
    </Layout>
)

export default IndexPage
