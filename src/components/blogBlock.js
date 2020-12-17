/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-16 14:18:58
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-17 11:39:53
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\components\blogBlock.js
 */

import React from "react";
import { Link } from "gatsby"
import { 
  rhythm, 
  // scale, 
} from "../utils/typography"
import TagTemplate from './tagTemplate'

const BlogBlock = ({node}) =>{
  console.log(node);
  const title = node.frontmatter.title || node.fields.slug
  return (
    <article key={node.fields.slug} className="post-view">
      <header>
        <h3
          style={{
            marginBottom: rhythm(1 / 4),
          }}
        >
          {/* 标题 */}
          <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
            {title}
          </Link>
        </h3>
        {/* 日期和标签 */}
        <TagTemplate date={node.frontmatter.date} tags={node.frontmatter.tags} />
      </header>
      <section>
        {/* 简介 */}
        <p
          dangerouslySetInnerHTML={{
            __html: node.frontmatter.description || node.excerpt,
          }}
        />
      </section>
    </article>
  )
}

export default BlogBlock