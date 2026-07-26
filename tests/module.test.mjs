import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const moduleText = fs.readFileSync(new URL("../bilibiliADBLOCk", import.meta.url), "utf8");
const vendorText = fs.readFileSync(
  new URL("../vendor/BiliUniverse.ADBlock.v0.6.24.response.bundle.js", import.meta.url),
  "utf8",
);

test("all runtime scripts use this repository", () => {
  const paths = [...moduleText.matchAll(/script-path=([^,\n]+)/g)].map((match) => match[1]);
  assert.ok(paths.length > 0);
  assert.ok(paths.every((path) => path.startsWith("https://raw.githubusercontent.com/Hey-sayiwanna/bilibiliAdBlock/main/")));
});

test("module never rewrites account mine or the bottom navigation", () => {
  assert.doesNotMatch(moduleText, /account\\?\/mine|account\/mine|bilibili-mine-ad/);
});

test("old third-party runtime hosts are absent", () => {
  assert.doesNotMatch(moduleText, /klraw\.pages\.dev|github\.com\/BiliUniverse\/ADBlock\/releases/);
});

test("traffic warning and comment ads use the self-hosted protobuf cleaner", () => {
  assert.match(moduleText, /bilibili\\\.app\\\.view\\\.v1\\\.View\\\/TFInfo/);
  assert.match(moduleText, /bilibili\\\.main\\\.community\\\.reply\\\.v1\\\.Reply\\\/MainList/);

  const vendorPath =
    "https://raw.githubusercontent.com/Hey-sayiwanna/bilibiliAdBlock/main/vendor/BiliUniverse.ADBlock.v0.6.24.response.bundle.js";
  const relevantRules = moduleText
    .split("\n")
    .filter((line) => line.includes("TFInfo") || line.includes("Reply\\/MainList"));

  assert.equal(relevantRules.length, 2);
  assert.ok(relevantRules.every((line) => line.includes(`script-path=${vendorPath}`)));
  assert.match(vendorText, /tfToast/);
  assert.match(vendorText, /MainList/);
});

test("the focused patch does not add another splash handler", () => {
  assert.equal((moduleText.match(/splash\\\//g) ?? []).length, 1);
});
