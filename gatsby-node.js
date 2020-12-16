/*
 * @Author       : yangwenfan
 * @Date         : 2020-12-15 15:03:55
 * @LastEditors  : yangwenfan
 * @LastEditTime : 2020-12-16 18:52:47
 * @Description  : 
 * @FilePath     : \My-gatsby-blog\gatsby-node.js
 */
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const homePaginate = path.resolve(`./src/templates/blog.js`);
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const tags = path.resolve(`./src/templates/tags.js`)
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title,
                tags
              }
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }


  // 
  // Create blog posts pages.
  const posts = result.data.allMarkdownRemark.edges

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    })
  })

  // 每页数量
  const pageSize = 10

  // 创建每页list
  function creatPageList(posts,component,path, obj){
    // const posts = result.data.allMarkdownRemark.edges
    // 总页数
    const totalPage = Math.ceil(posts.length / pageSize)
    
    Array.from({ length: totalPage }).forEach((_, i) => {
      let context={
        currentPage: i+1,
        totalPage,
        limit: pageSize,
        skip: i * pageSize,
      }
      if(obj){
        context = Object.assign(context,obj)
      }
      createPage({
        path: i === 0 ? `/${path}` : `/${path}/${i + 1}`,
        component,
        context,
      })
    })
  }
  creatPageList(posts, homePaginate, 'blog')


  // 拿到所有的tag
  let tagSet = new Set()
  posts.forEach(p=>{
    p.node.frontmatter.tags.forEach(t=>{
      tagSet.add(t)
    })
  })

  // for(let t of tagSet.values()){

  // }
  let tagArr = Array.from(tagSet)
  tagArr.forEach(async t=> {
    // const result = await graphql(
    //   `
    //     {
    //       site {
    //         siteMetadata {
    //           title
    //           description
    //         }
    //       }
    //       allMarkdownRemark(
    //         sort: { fields: [frontmatter___date], order: DESC }
    //         filter: {frontmatter: {tags: {eq: ${t+""}}}}
    //       ) {
    //         edges {
    //           node {
    //             excerpt
    //             fields {
    //               slug
    //             }
    //             frontmatter {
    //               date(formatString: "YYYY-MM-DD")
    //               title
    //               tags
    //             }
    //           }
    //         }
    //       }
    //     }
    //   `
    // )
    const ps = posts.filter(p=>p.node.frontmatter.tags.includes(t))
    creatPageList(ps, tags, 'tags/'+t ,{tags:t})
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
