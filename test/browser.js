const test = require('ava');
const phantom = require('phantom');
const JSDOM = require('jsdom').JSDOM;

test('That built module works in a browser', async (t) => {
  const instance = await phantom.create();
  const page = await instance.createPage();
  const status = await page.open('examples/index.html');

  t.is(status, 'success');

  // self executing function
  ((testFx, onReady) => {
    const start = new Date().getTime();
    let condition = false;
    const interval = setInterval(() => {
      if ((new Date().getTime() - start < 3000) && !condition) {
        // If not time-out yet and condition not yet fulfilled
        condition = testFx();
      } else if (!condition) {
        // If condition still not fulfilled (timeout but condition is 'false')
        instance.exit(1);
      } else {
        // Condition fulfilled (timeout and/or condition is 'true')
        onReady();
        clearInterval(interval);
      }
    }, 250);
  })(() => page.evaluate(() => window.document.querySelector('body').innerHTML !== ''), () => {
    const content = page.content;
    const dom = new JSDOM(content);
    const body = dom.window.document.querySelector('body').innerHTML;
    instance.exit();
    t.is(
       body,
       'foo0<br>foo1<br>foo2<br>foo3<br>foo4<br>foo5<br>' +
           'foo6<br>foo7<br>foo8<br>foo9<br>\n\n\n\n\n',
    );
  });
});
