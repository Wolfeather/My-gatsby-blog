import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"


const BlogPageTemplate = ({ data,pageContext, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const {totalPage,currentPage,limit,skip} = pageContext
  const posts = data.allMarkdownRemark.edges
  const title = "首页"
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={title} />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug} class="post-view">
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
      <div>
          {currentPage - 1 > 0 && (
            <Link
              to={'/blog/' + (currentPage - 1 === 1 ? '' : currentPage - 1)}
              rel="prev"
            >
              ← 上一页
            </Link>
          )}
        </div>
        <div>
          {currentPage + 1 <= totalPage && (
            <Link to={'/blog/' + (currentPage + 1)} rel="next">
              下一页 →
            </Link>
          )}
        </div>
    </Layout>
  )
}

export default BlogPageTemplate

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
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
