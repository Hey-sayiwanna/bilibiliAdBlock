# B站去广告（自托管增强版）

适用于 Surge 的 B站去广告模块。运行文件全部使用本仓库地址，减少外部脚本失效带来的影响。

## 订阅地址

https://raw.githubusercontent.com/Hey-sayiwanna/bilibiliAdBlock/main/bilibiliADBLOCk

## 功能

- 首页信息流、搜索推荐、右上角活动入口去广告
- 直播信息流、直播间和直播 Tab 广告清理
- 视频简介区商业卡、关联推广和活动横幅清理
- “流量告急”和办卡免流提示清理
- 保留底部完整导航，不删除或移动“会员购”

## 安装

1. 删除旧的 B站去广告模块，避免重复脚本互相影响。
2. 使用上面的订阅地址导入 Surge。
3. 开启模块、脚本、HTTP 重写和 MitM，并安装信任 Surge 证书。
4. 完全退出 B站 App 后重新打开。

## 使用说明

- 首次更新脚本可能受 GitHub 网络速度影响，加载完成后 Surge 会使用缓存。
- 本项目不修改“我的”页面，也不精简底部导航。
- B站接口变化后，个别新广告形式可能需要继续补充。

## 开源说明

轻微致谢 [BiliUniverse/ADBlock](https://github.com/BiliUniverse/ADBlock) 开源项目提供的基础思路与代码。
