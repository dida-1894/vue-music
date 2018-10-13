## css问题
### position: fixed 实效
- Stacking Context -- 堆叠上下文的产生
  - transform 属性值不为none
    - 我使用了better-scroll这个插件，他使得class为content的父元素transform不为none
  任何非none的transform -> 产生Stacking Content -> 影响该元素的层叠关系和定位关系 -> 影响子元素的固定定位 fixed不再基于Viewport 而是基于该元素

  - 设置了transform-style: preserve-3d 的元素
  - perspective值不为none的元素
  - 在will-change中指定了任意css熟悉
- 不同浏览器的表现


- 字体图标与文字对齐 vertical-align:middle 无效

## vue问题
- v-bind:class="{active: isActive}" 实效

### VueRouter

### webpack
#### 概念
  - 模块打包工具，递归打包项目中所有模块，支持模块化。
  - bundle
    - 打包出来的文件
  - chunk
    - 代码块
  - module
    - 依赖模块
  - Loader
    - 输出对应文件
  - Plugin
   - 插件
#### 配置
  webpack-cli / vue-cli
#### 开发
  - webpack-dev-server 使用内存来存储webpack开发环境下的 就是express
  - 模块热更新
    - 自动刷新浏览器 websokect
#### 优化
  - 长缓存
  - Tree-shaking 打包中去除那些引入但却没有使用到的代码。
### git
#### 版本回退
 - git log查看版本控制系统的历史纪录
 - HEAD表示当前版本 ^HEAD表示上一个版本 ^^HEAD表示上上一个版本 HEAD~100
 - git reset --hard HEAD^
 - git reset --hard 1094a （根据 commit id切换版本， 可以回到之前）
 - git reflog 记录每一次命令 （可以在此找到commit id）
#### 分支管理
  - 创建dev分支 git branch dev
  - 切换分支 git checkout
  - git branch dev + git checkout dev == git checkout -b dev 创建并切换
  - git branch 查看当前分支 git branch -d dev 删除dev分支
  - 合并分支 git merge
  - 合并冲突 dev 和 master上同时有了新的commit  
