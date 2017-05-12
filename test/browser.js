const test = require('ava');
const phantom = require('phantom');
const JSDOM = require('jsdom').JSDOM;

test('That built module works in a browser', async (t) => {
    const instance = await phantom.create();
    const page = await instance.createPage();
    const status = await page.open('examples/index.html');

    t.is(status, 'success');

    const content = await page.property('content');
    const dom = new JSDOM(content);
    const body = dom.window.document.querySelector('body').innerHTML;

    await instance.exit();
    t.is(
        body,
        'foo0<br>foo1<br>foo2<br>foo3<br>foo4<br>foo5<br>' +
            'foo6<br>foo7<br>foo8<br>foo9<br>\n\n\n\n\n'
    );
});
