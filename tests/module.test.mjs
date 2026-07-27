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

test("intro ads and traffic warning each use one self-hosted protobuf rule", () => {
  const introRules = moduleText
    .split("\n")
    .filter((line) => line.startsWith("Bili.Player.AdPatch ="));
  const trafficRules = moduleText
    .split("\n")
    .filter((line) => line.startsWith("Bili.Player.TFInfo.AdPatch ="));

  assert.equal(introRules.length, 1);
  assert.equal(trafficRules.length, 1);
  assert.match(moduleText, /bilibili\\\.app\\\.view\\\.v1\\\.View\\\/TFInfo/);

  const vendorPath =
    "https://raw.githubusercontent.com/Hey-sayiwanna/bilibiliAdBlock/main/vendor/BiliUniverse.ADBlock.v0.6.24.response.bundle.js";
  const relevantRules = [...introRules, ...trafficRules];
  assert.ok(relevantRules.every((line) => line.includes(`script-path=${vendorPath}`)));
  assert.match(vendorText, /tfToast/);
  assert.match(vendorText, /tfPanelCustomized/);
  assert.match(vendorText, /cmConfig/);
  assert.match(vendorText, /cmIpad/);
  assert.match(vendorText, /relateCardType/);
  assert.match(vendorText, /uniqueId/);
});

test("comment requests are not intercepted", () => {
  assert.doesNotMatch(moduleText, /Reply\\\/MainList|Bili\.Reply\.AdPatch/);
});

test("search result ads use the self-hosted protobuf cleaner", () => {
  assert.match(
    moduleText,
    /bilibili\\\.polymer\\\.app\\\.search\\\.v1\\\.Search\\\/SearchAll/,
  );

  const searchRule = moduleText
    .split("\n")
    .find((line) => line.includes("bilibili-search-result-ad"));
  assert.ok(searchRule);
  assert.match(searchRule, /binary-body-mode=1/);
  assert.match(searchRule, /argument=Search\.AD=true&LogLevel=WARN/);
  assert.match(
    searchRule,
    /script-path=https:\/\/raw\.githubusercontent\.com\/Hey-sayiwanna\/bilibiliAdBlock\/main\/vendor\/BiliUniverse\.ADBlock\.v0\.6\.24\.response\.bundle\.js/,
  );

  assert.match(vendorText, /oneofKind!==["']cm["']/);
  assert.match(vendorText, /oneofKind!==["']game["']/);
});

test("the focused patch does not add another splash handler", () => {
  assert.equal((moduleText.match(/splash\\\//g) ?? []).length, 1);
});
