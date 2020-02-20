const test = require("ava");
const puppeteer = require("puppeteer");
const path = require("path");

test("That built module works in a browser", async t => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(`file://${path.resolve("examples/index.html")}`);

  const body = await page.evaluate(() => document.body.innerHTML);
  t.is(
    body.trim(),
    "foo0<br>foo1<br>foo2<br>foo3<br>foo4<br>foo5<br>" +
      "foo6<br>foo7<br>foo8<br>foo9<br>"
  );

  await browser.close();
});
