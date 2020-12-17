/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-17 11:14:47
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\pages\index.js
 */
import React from "react"
import { 
  // Link, 
  graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogBlock from '../components/blogBlock'
// import { rhythm } from "../utils/typography"


// 首页
const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const title = "首页"
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} />
      <Bio />
      {posts.map(({ node }) => <BlogBlock node={node} key={node.excerpt}/>)}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            tags
            title
            description
          }
        }
      }
    }
  }
`
