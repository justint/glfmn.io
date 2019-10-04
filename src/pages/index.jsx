import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
import Pane, { Box, Title, LineBox } from "../components/pane"
import SEO from "../components/seo"

const IndexPage = () => (
    <Layout>
        <SEO title="Home" />
        <Pane foot='test.txt'>
            <Box>
                <Title excerpt="title" author="author" date="date">
                    Excerpt from the article
                </Title>
            </Box>
        </Pane>
    </Layout>
)

export default IndexPage
