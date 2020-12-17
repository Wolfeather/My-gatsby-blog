/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-17 10:51:37
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\templates\tags.js
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


const TagsTemplate = ({ data,pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const {
    totalPage,
    currentPage,
    // limit,
    // skip,
    tags
  } = pageContext
  const posts = data.allMarkdownRemark.edges
  const title = "首页"
  const path = "/tags/" + tags + '/'
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} />
      <Bio />
      {posts.map(({ node }) => <BlogBlock node={node} key={node.excerpt}/>)}
      <Pagination pageContext={{totalPage,currentPage,path}} />
    </Layout>
  )
}

export default TagsTemplate

export const pageQuery = graphql`
  query($skip: Int!, $limit: Int!, $tags: String!) {
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
      filter: {frontmatter: {tags: {eq: $tags}}}
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
