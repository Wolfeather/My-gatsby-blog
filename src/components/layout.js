/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:30:13
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-22 17:07:54
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\components\layout.js
 */
import React from "react"
import { Link } from "gatsby"
import { rhythm, scale } from "../utils/typography"

import Footer from './footer'

const Layout = ({ location, title, children }) => {
  // const rootPath = `${__PATH_PREFIX__}/`
  const rootPath = `blog`
  let header
  console.log('rootPath:', rootPath);
  const isHomePage = location.pathname.includes(rootPath)
  if (isHomePage) {
    // 如果是首页
    header = (
      <h1
        style={{
          ...scale(1.5),
          marginBottom: rhythm(1.5),
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
  } else {
    // 如果不是首页
    header = (
      <h3
        style={{
          marginTop: 0,
        }}
      >
        <Link
          style={{
            boxShadow: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h3>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <Footer/>
    </div>
  )
}

export default Layout
