# node-Comunity
# Node.js + Vue.js +mongodb 全栈开发社区团购商城

## 一、安装
  ### 1.Community为server端<br/>
  npm i 安装依赖 <br/>
  npm run dev<br/>
  需要安装mongodb和redis<br/>
  在index.js中的cors根据自己的情况配置跨域设置<br/>
  由于注册使用的是邮箱发送验证码需要在Community/config/config.js中修改自己邮箱的smtp配置信息<br/>
  邮箱打开smtp方法可在[qq邮箱文档](https://service.mail.qq.com/cgi-bin/help?subtype=1&no=166&id=28). 上查看 <br/>

  ### 2.community_manager为管理系统<br/>
  npm i 安装依赖 <br/>
  npm run serve<br/>
  smtp配置好后直接在注册界面用邮箱注册即可<br/>
 [预览地址 http://106.14.173.159:8081](http://106.14.173.159:8081)<br/>

 ###  注意 (预览版本与当前版本不一致)

  ### 3.community_web为客户端<br/>
  npm i 安装依赖 <br/>
  npm run serve<br/>
  [预览地址 http://cty.zflzqy.com](http://cty.zflzqy.com)<br/>


### 注意 (预览版本与当前版本不一致)

## 二、server端
  1.使用koa框架开发<br/>
  2.数据库使用mongoose,redis<br/>
  3.使用socket.io给在线用户发送活动信息<br/>
  4.使用jsonwebtoken,koa-jwt做登陆认证<br/>
  5.nodemailer去发送邮箱验证码<br/>
  6.koa-multer处理文件上传<br/>
  7.koa2-cors配置跨域<br/>
## 三、管理后台
   1.基于iview组件库的后台管理基础界面搭建<br/>
   2.创建分类<br/>
   3.修改分类<br/>
   4.删除分类<br/>
   5.添加商品<br/>
   6.删除商品,<br/>
   7.商品管理,<br/>
   8.使用formData上传图片,<br/>
   9.团长管理,<br/>
   10.团长佣金操作,<br/>
   11.今日订单,<br/>
   12.订单导出excel表格,<br/>
   13.社区订单<br/>
   14.今日金额记录,<br/>
   15.活动消息推送,<br/>
   16.首页广告管理<br/>
   17.用户增加情况,<br/>
   18.登陆界面<br/>
   19.路由限制(beforeEach,meta),<br/>
   20.axios拦截器配置每次请求在headers中带token<br/>
## 四、客户端
   1.使用有赞的vant组件库<br/>
   2.css预处理less,<br/>
   ### 首页
     1.首页默认匹配距离最近的社区团长
     2.新闻广告
     3.热门购买 
     4.分类 
  ### 分类
     1.各分类商品信息
     2.直接加入购物车
  ### 购物车
     1.底部推荐商品
     2.购物车内容
     3.计算价格
  ### 我的(普通用户)        
     1.待支付，代收货，已完成，已取消的订单
     2.申请成为团长操作
     3.设置默认操作,
     4.自己的二维码(团长扫描二维码直接完成发货动作)
  ### 我的(团长)   
     1.查看一次团购所有人下的订单
     2.佣金记录
     3.提现

