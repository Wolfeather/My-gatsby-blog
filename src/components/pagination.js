/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-17 10:43:17
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-17 11:14:53
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\components\pagination.js
 */

import React from "react";
import { Link } from "gatsby"
// import { rhythm, scale } from "../utils/typography"

const Pagination = ({pageContext}) =>{
  const {
    totalPage,
    currentPage,
    path
  } = pageContext
  return (
    <ul className="pagination">
      <li>
        {currentPage - 1 > 0 && (
          <Link
            to={path + (currentPage - 1 === 1 ? '' : currentPage - 1)}
            rel="prev"
          >
            ← 上一页
          </Link>
        )}
      </li>
      <li>
        {currentPage + 1 <= totalPage && (
          <Link to={path + (currentPage + 1)} rel="next">
            下一页 →
          </Link>
        )}
      </li>
    </ul>
  )
}

export default Pagination