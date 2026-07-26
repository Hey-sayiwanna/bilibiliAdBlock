# Third-party notices

## BiliUniverse/ADBlock

This project includes the unmodified `response.bundle.js` from BiliUniverse/ADBlock v0.6.24 for Bilibili protobuf player-response processing.

- Source: https://github.com/BiliUniverse/ADBlock
- License: Apache License 2.0
- Local license copy: `licenses/BiliUniverse-ADBlock-Apache-2.0.txt`
- Vendored file: `vendor/BiliUniverse.ADBlock.v0.6.24.response.bundle.js`

The JSON cleaner in `scripts/bilibili-json.js` is a smaller local adaptation. It intentionally omits account-page processing so the bottom navigation, including 会员购, is preserved.
