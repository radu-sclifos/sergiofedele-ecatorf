import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const context = vm.createContext({
    document: {readyState: 'loading', addEventListener() {}},
});
vm.runInContext(fs.readFileSync(new URL('../public/verifica-browser.js', import.meta.url), 'utf8'), context);

test('Opera and Chromium versions remain distinct on Windows 7', () => {
    const ua = 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.5414.120 Safari/537.36 OPR/95.0.4635.84';
    assert.equal(context.identifyBrowser(ua), 'Opera 95.0.4635.84');
    assert.equal(context.reportedChromium(ua), '109.0.5414.120');
    assert.equal(context.identifySystem(ua), 'Windows 7');
});

test('Presto Opera is not reported as Chromium', () => {
    const ua = 'Opera/9.80 (Windows NT 6.1; U; it) Presto/2.12.388 Version/12.18';
    assert.equal(context.identifyBrowser(ua), 'Opera 12.18');
    assert.equal(context.reportedChromium(ua), null);
});

test('Firefox is not reported as Chromium', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:115.0) Gecko/20100101 Firefox/115.0';
    assert.equal(context.identifyBrowser(ua), 'Firefox 115.0');
    assert.equal(context.reportedChromium(ua), null);
});

test('Windows 10 and 11 are not falsely distinguished from the user agent', () => {
    assert.equal(context.identifySystem('Windows NT 10.0'), 'Windows 10 o 11 (qui non distinguibili)');
    assert.equal(context.identifySystem('Windows NT 6.3'), 'Windows 8.1');
});

test('Client hints can supply a missing declared Chromium version', () => {
    assert.equal(context.reportedChromium('unrecognized', [
        {brand: 'Not A Brand', version: '99'}, {brand: 'Chromium', version: '109'},
    ]), '109');
    assert.equal(context.reportedChromium('unrecognized'), null);
});

test('Edge takes precedence over the Chrome token', () => {
    assert.equal(context.identifyBrowser('Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.78'), 'Microsoft Edge 109.0.1518.78');
});
