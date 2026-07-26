import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const moduleText = fs.readFileSync(new URL("../bilibiliADBLOCk", import.meta.url), "utf8");

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
