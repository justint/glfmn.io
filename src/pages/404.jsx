import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" /> {/* move SEO outside of </Layout> so it's not treated as a child prop */}
    <Layout>
      <div>  {/* what this div does is it's wrapping the content so </Layout> will only map one child */}
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </div>
    </Layout>
  </>
)

export default NotFoundPage
