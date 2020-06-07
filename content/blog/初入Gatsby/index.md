---
title: 初入Gatsby
date: "2020-06-07"
description: ''
tags: ["Gatsby" , "博客"]
---

## 前言
一直想过做一个自己的博客，却一直被自己的拖延症耽搁。（说到底还是条懒狗。）



## 问题总结
成功的路，总是艰难险阻。

### pngquant-bin
当在执行 `yarn`命令的时候，出现的这样的错误：
```
error D:\project\Web\my-blog-starter\node_modules\pngquant-bin: Command failed.
Exit code: 1
Command: node lib/install.js
Arguments:
Directory: D:\project\Web\my-blog-starter\node_modules\pngquant-bin
Output:
‼ read ECONNRESET
  ‼ pngquant pre-build test failed
  i compiling from source
```

但是这个问题又不影响我的项目的启动。

不过我把他挂在VPS上之后就发现了问题：图片压缩问题



