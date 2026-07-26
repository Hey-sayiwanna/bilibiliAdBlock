# B站去广告（自托管版）

Surge 使用的脚本和运行文件都保存在本仓库，不再依赖容易失效的第三方脚本地址。

## 订阅地址

https://raw.githubusercontent.com/Hey-sayiwanna/bilibiliAdBlock/main/bilibiliADBLOCk

## 功能

- 首页信息流、搜索推荐、右上角活动入口去广告
- 直播信息流、直播间和直播 Tab 广告清理
- 开屏与播放器下方商业卡清理
- 保留底部完整导航，尤其不会删除或移动“会员购”

## 安装

1. 删除旧的 B站去广告模块，避免重复脚本互相影响。
2. 使用上面的订阅地址导入 Surge。
3. 开启模块、脚本、HTTP 重写和 MitM，并安装信任 Surge 证书。
4. 完全退出 B站 App 后重新打开。

## 开源说明

播放器处理核心来自 [BiliUniverse/ADBlock](https://github.com/BiliUniverse/ADBlock)，按 Apache-2.0 许可证保留在本仓库。详细署名见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。
