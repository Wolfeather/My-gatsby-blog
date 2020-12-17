/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-17 11:36:05
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-17 11:49:17
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\components\tagTemplate.js
 */

import React from "react";
import { Link } from "gatsby"

const TagTemplate = ({date,tags}) =>{
  return (
    <div>
      <small className="mr-1"> 
        <i className="iconfont icon-calendar mr-1"></i>
        {date}
      </small>
      <small>
        <i className="iconfont icon-tag mr-1"></i>
        {tags.map(i=>
        <Link className="mr-1" key={i} to={'tags/'+i}>{i}</Link>
        )}
      </small>
    </div>
  )
}

export default TagTemplate