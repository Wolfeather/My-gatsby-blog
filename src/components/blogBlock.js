/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-16 14:18:58
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-16 18:42:43
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\components\blogBlock.js
 */

import React from "react";
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

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
        <small> 
          <i className="iconfont icon-calendar"></i>
          {node.frontmatter.date}
        </small>
        <small>
          <i className="iconfont icon-tag"></i>
          {node.frontmatter.tags.map(i=>
          <Link className="tab-span" key={i} to={'tags/'+i}>{i}</Link>
          )}
        </small>
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