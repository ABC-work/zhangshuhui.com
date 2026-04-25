# Deploy zhangshuhui.com

这个站点是纯静态网站，可以部署到 GitHub Pages、Vercel、Netlify 或任意静态服务器。

## 推荐方案：GitHub Pages

1. 在 GitHub 新建仓库，建议命名为 `zhangshuhui.com`。
2. 把本目录推送到该仓库。
3. 打开仓库的 `Settings` -> `Pages`。
4. 在 `Build and deployment` 里选择：
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
5. 在 `Custom domain` 填入：

```text
zhangshuhui.com
```

6. 等 DNS 生效后，勾选 `Enforce HTTPS`。

## Git 命令

第一次推送时，把下面的 `<your-github-username>` 替换为你的 GitHub 用户名：

```sh
git remote add origin https://github.com/<your-github-username>/zhangshuhui.com.git
git branch -M main
git push -u origin main
```

## DNS 记录

在域名服务商后台添加这些记录。

根域名 `zhangshuhui.com`：

```text
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

www 子域名：

```text
Type: CNAME
Name: www
Value: <your-github-username>.github.io
```

## 当前站点文件

- `index.html`: 页面结构和内容
- `styles.css`: 视觉样式
- `script.js`: 动态背景与本地时间
- `assets/`: 图片与图标
- `CNAME`: GitHub Pages 自定义域名配置
