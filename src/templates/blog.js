/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-17 11:14:18
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\templates\blog.js
 */
import React from "react"
import { 
  // Link, 
  graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogBlock from '../components/blogBlock'
import Pagination from '../components/pagination'
// import { rhythm, scale } from "../utils/typography"


const BlogTemplate = ({ data,pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const {
    totalPage,
    currentPage,
    // limit,
    // skip,
  } = pageContext
  const posts = data.allMarkdownRemark.edges
  const title = "首页"
  const path = '/blog/'
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} />
      <Bio />
      {posts.map(({ node }) => <BlogBlock node={node} key={node.excerpt} />)}
      <Pagination pageContext={{totalPage,currentPage,path}} />
    </Layout>
  )
}

export default BlogTemplate

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
            tags
          }
        }
      }
    }
  }
`
