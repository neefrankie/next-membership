## 启动步骤
npm install

gulp serve

## 技术栈
ES6 + scss + nunjucks + node + gulp + rollup

## gulp 任务
- gulp build-page 编译出html页面
- gulp build  编译出文件
- gulp serve  启动本地服务器
- gulp copy   clean, build, copyHtml  发布
- gulp copyTest  仅仅发布subscriptionTest.html文件到ftac项目中

## 文件定位
views/data/data.json ：保存页面显示文字

views/data/path-detail.json ：保存页面引入文件路劲


## 碰到的问题
1. 使用$.cssnano()，会使得css中http://www.ftacademy.cn/subscription.jpg 链接的www去掉，所以需要注意，最好用相对路劲
