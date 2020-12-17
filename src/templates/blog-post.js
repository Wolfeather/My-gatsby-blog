/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-17 19:32:42
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\templates\blog-post.js
 */
import React from "react"
import { Link, graphql } from "gatsby"
import { 
  rhythm, 
  // scale,
} from "../utils/typography"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import TagTemplate from '../components/tagTemplate'



// 博客模板页面
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  console.log(post.tableOfContents);
  return (
    <Layout location={location} title={siteTitle}>
      <div className="toc" dangerouslySetInnerHTML={{__html:post.tableOfContents}}></div>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <TagTemplate className="mb-1 mt-1" date={post.frontmatter.date} tags={post.frontmatter.tags}/>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul className="pagination">
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        tags
        description
      }
    }
  }
`
