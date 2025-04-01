# 金句卡片生成器部署指南

本文档提供了将金句卡片生成器部署到公网的多种方法，让其他人可以通过互联网访问和使用这个应用。

## 部署选项

### 1. 使用GitHub Pages（推荐，免费）

GitHub Pages是一个免费的静态网站托管服务，非常适合部署这种纯前端应用。

#### 步骤：

1. 创建GitHub账号（如果还没有）
2. 创建新的GitHub仓库
3. 上传金句卡片生成器的所有文件到仓库
4. 启用GitHub Pages：
   - 进入仓库设置（Settings）
   - 找到Pages选项
   - 选择main分支作为源（Source）
   - 保存设置
5. 几分钟后，您的应用将在`https://[您的用户名].github.io/[仓库名]/`上线

### 2. 使用Vercel（免费，更专业）

Vercel提供更专业的前端部署服务，支持自动部署和自定义域名。

#### 步骤：

1. 注册Vercel账号：https://vercel.com/signup
2. 将项目上传到GitHub仓库
3. 在Vercel中导入该GitHub项目
4. 按照向导完成部署
5. 部署完成后，Vercel会提供一个默认域名（例如：`https://your-project.vercel.app`）

### 3. 使用Netlify（免费，简单）

Netlify也是一个流行的静态网站托管平台。

#### 步骤：

1. 注册Netlify账号：https://app.netlify.com/signup
2. 将项目上传到GitHub仓库
3. 在Netlify中点击"New site from Git"
4. 选择您的GitHub仓库
5. 保持默认设置并点击"Deploy site"
6. 部署完成后，Netlify会提供一个默认域名

### 4. 使用传统虚拟主机（付费）

如果您已经有虚拟主机服务，也可以将应用部署到那里。

#### 步骤：

1. 登录您的虚拟主机控制面板
2. 使用FTP工具（如FileZilla）上传所有文件到网站根目录
3. 访问您的域名即可使用应用

## 自定义域名设置

如果您有自己的域名，可以将其绑定到上述任何一种部署方式：

1. 在域名提供商的DNS设置中，添加CNAME记录指向您的部署地址
2. 在部署平台（GitHub Pages/Vercel/Netlify）中配置自定义域名
3. 等待DNS生效（通常需要几小时到24小时）

## 注意事项

1. 确保上传所有必要文件，包括HTML、CSS、JavaScript和图片资源
2. 检查文件路径是否正确，特别是图片和CSS/JS引用
3. 如果使用自定义字体，确保字体文件也已上传
4. 测试部署后的应用，确保所有功能正常工作

## 相关资源

- [GitHub Pages文档](https://docs.github.com/cn/pages)
- [Vercel文档](https://vercel.com/docs)
- [Netlify文档](https://docs.netlify.com/)

祝您部署顺利！