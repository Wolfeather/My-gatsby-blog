/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-22 17:07:27
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
import GitalkComponent from "gitalk/dist/gitalk-component";
import Footer from '../components/footer'
const clientID = '950d10588a85b7774030'
const clientSecret = 'befc5187be419ab369f551e3a9a5311c7181e605'
const repo = 'blogComment'
const owner = 'Wolfeather'
const admin = ['Wolfeather']
// 博客模板页面
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  return (
    <div>
      <div className="post-contain" location={location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
        />
        <div className="post-content">
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
          <GitalkComponent options={{
            clientID,
            clientSecret,
            repo,
            owner,
            admin,
            title: post.frontmatter.title,
            distractionFreeMode: true,  // 是否添加全屏遮罩
            id: window.location.pathname,    // 页面的唯一标识，gitalk 会根据这个标识自动创建的issue的标签,我们使用页面的相对路径作为标识
            enableHotKey: true,  // 提交评论快捷键(cmd/ctrl + enter) 
          }} />
        </div>
        <aside className="post-aside">
          <div className="toc" dangerouslySetInnerHTML={{__html:post.tableOfContents}}></div>

        </aside>
        
      </div>
      <Footer/>
    </div>
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
