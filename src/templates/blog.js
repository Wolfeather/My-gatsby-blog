/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-16 19:06:31
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\templates\blog.js
 */
import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BlogBlock from '../components/blogBlock'
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
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} />
      <Bio />
      {posts.map(({ node }) => <BlogBlock node={node} key={node.excerpt}/>)}
      <ul className="pagination">
        <li>
          {currentPage - 1 > 0 && (
            <Link
              to={'/blog/' + (currentPage - 1 === 1 ? '' : currentPage - 1)}
              rel="prev"
            >
              ← 上一页
            </Link>
          )}
        </li>
        <li>
          {currentPage + 1 <= totalPage && (
            <Link to={'/blog/' + (currentPage + 1)} rel="next">
              下一页 →
            </Link>
          )}
        </li>
      </ul>
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
