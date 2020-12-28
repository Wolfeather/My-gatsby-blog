/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-22 16:43:09
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-22 16:45:41
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\src\components\footer.js
 */

import React from "react"

const Footer = ()=>{
  return (
    <footer className="footer">
      © {new Date().getFullYear()}, powered by Gatsby
    </footer>
  )
}

export default Footer


