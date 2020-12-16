/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-16 19:08:13
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\templates\tags.js
 */
import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogBlock from '../components/blogBlock'
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
      <ul className="pagination">
        <li>
          {currentPage - 1 > 0 && (
            <Link
              to={ path + (currentPage - 1 === 1 ? '' : currentPage - 1)}
              rel="prev"
            >
              ← 上一页
            </Link>
          )}
        </li>
        <li>
          {currentPage + 1 <= totalPage && (
            <Link to={ path + (currentPage + 1)} rel="next">
              下一页 →
            </Link>
          )}
        </li>
      </ul>
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
