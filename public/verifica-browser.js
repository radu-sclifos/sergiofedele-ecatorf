/* Standalone classic script: keep ES5 syntax so diagnosis can run on old browsers.
 * Experimental CSS is applied at runtime, never rewritten by the site build.
 */
function identifyBrowser(ua) {
    var match;
    var candidates = [
        [/OPR\/([\d.]+)/, 'Opera'],
        [/Opera[\s/]([\d.]+)/, 'Opera'],
        [/Edg(?:A|iOS)?\/([\d.]+)/, 'Microsoft Edge'],
        [/Firefox\/([\d.]+)/, 'Firefox'],
        [/Chrome\/([\d.]+)/, 'Chrome o browser basato su Chromium'],
        [/Version\/([\d.]+).*Safari\//, 'Safari']
    ];
    for (var i = 0; i < candidates.length; i++) {
        match = ua.match(candidates[i][0]);
        if (match) {
            if (candidates[i][1] === 'Opera' && /Opera[\s/]/.test(ua)) {
                var version = ua.match(/Version\/([\d.]+)/);
                if (version) match = version;
            }
            return candidates[i][1] + ' ' + match[1];
        }
    }
    return 'Non identificato';
}

function identifySystem(ua) {
    if (/Windows NT 6\.1\b/.test(ua)) return 'Windows 7';
    if (/Windows NT 6\.2\b/.test(ua)) return 'Windows 8';
    if (/Windows NT 6\.3\b/.test(ua)) return 'Windows 8.1';
    if (/Windows NT 10\.0\b/.test(ua)) return 'Windows 10 o 11 (qui non distinguibili)';
    if (/Windows NT 6\.0\b/.test(ua)) return 'Windows Vista';
    if (/Windows NT 5\.1\b/.test(ua)) return 'Windows XP';
    if (/Android/.test(ua)) return 'Android';
    if (/iPhone|iPad|iPod/.test(ua)) return 'iPhone / iPad';
    if (/Macintosh|Mac OS X/.test(ua)) return 'macOS';
    if (/Linux/.test(ua)) return 'Linux';
    return 'Non identificato';
}

function reportedChromium(ua, brands) {
    var match = ua.match(/(?:Chrome|Chromium)\/([\d.]+)/);
    if (match) return match[1];
    for (var i = 0; brands && i < brands.length; i++) {
        if (brands[i].brand === 'Chromium') return brands[i].version;
    }
    return null;
}

function runBrowserCheck() {
    var ua = navigator.userAgent || '';
    var brands = navigator.userAgentData && navigator.userAgentData.brands;
    var chromium = reportedChromium(ua, brands);
    document.getElementById('browser').textContent = identifyBrowser(ua);
    document.getElementById('chromium').textContent = chromium
        ? 'Chromium dichiarato: ' + chromium
        : 'Versione Chromium non disponibile';
    document.getElementById('system').textContent = identifySystem(ua);

    var probes = document.getElementById('probes');
    var results = document.getElementById('results');
    var report = [];
    results.textContent = '';

    function probe(css) {
        var node = document.createElement('div');
        node.style.cssText = css;
        probes.appendChild(node);
        return node;
    }

    function supports(property, value) {
        if (!window.CSS || typeof window.CSS.supports !== 'function') return null;
        return window.CSS.supports(property, value);
    }

    function test(label, check) {
        var result;
        try { result = check(); } catch (error) { result = null; }
        var answer = result === true ? 'Sì' : result === false ? 'No' : 'Non verificabile';
        var row = document.createElement('tr');
        var name = document.createElement('td');
        var value = document.createElement('td');
        name.textContent = label;
        value.textContent = answer;
        value.className = result === true ? 'yes' : result === false ? 'no' : 'unknown';
        row.appendChild(name);
        row.appendChild(value);
        results.appendChild(row);
        report.push(label + ': ' + answer);
    }

    function viewportHeight(unit) {
        var recognized = supports('height', '100' + unit);
        if (recognized !== true) return recognized;
        return probe('height:100' + unit).getBoundingClientRect().height > 0;
    }

    test('Altezza copertina: svh', function () { return viewportHeight('svh'); });
    test('Altezza dinamica: dvh', function () { return viewportHeight('dvh'); });
    test('Proporzioni immagini: aspect-ratio', function () {
        return Math.abs(probe('width:120px;aspect-ratio:2 / 1').getBoundingClientRect().height - 60) < 1;
    });
    test('Spaziatura Flexbox: gap', function () {
        var node = probe('display:flex;flex-direction:column;row-gap:1px;width:10px');
        for (var i = 0; i < 2; i++) {
            var child = document.createElement('div');
            child.style.cssText = 'height:10px;flex-shrink:0';
            node.appendChild(child);
        }
        return Math.abs(node.getBoundingClientRect().height - 21) < 0.5;
    });
    test('Selettore CSS: :has()', function () {
        var parent = probe('');
        var child = document.createElement('div');
        child.appendChild(document.createElement('span'));
        parent.appendChild(child);
        try { return parent.querySelector('div:has(span)') === child; }
        catch (error) {
            // An unsupported selector is a failed test, not a broken page.
            return false;
        }
    });
    test('Media query: width >=', function () {
        if (typeof window.matchMedia !== 'function') return null;
        return window.matchMedia('(width >= 0px)').matches;
    });
    test('Spostamento CSS: translate', function () {
        var recognized = supports('translate', '10px');
        if (recognized !== true) return recognized;
        var node = probe('width:10px;height:10px');
        var before = node.getBoundingClientRect().left;
        node.style.setProperty('translate', '10px');
        return Math.abs(node.getBoundingClientRect().left - before - 10) < 0.5;
    });
    test('Dimensioni fluide: clamp()', function () {
        return Math.abs(probe('height:clamp(10px,20px,30px)').getBoundingClientRect().height - 20) < 0.5;
    });
    test('Colonne CSS Grid', function () { return supports('display', 'grid'); });
    test('ResizeObserver (gallerie)', function () { return typeof window.ResizeObserver === 'function'; });
    test('IntersectionObserver (caroselli)', function () { return typeof window.IntersectionObserver === 'function'; });
    test('Pointer Events (sfogliatore)', function () { return typeof window.PointerEvent === 'function'; });

    document.getElementById('technical').textContent =
        'Verifica browser - revisione 1\n' +
        'Browser: ' + identifyBrowser(ua) + '\n' +
        'Chromium dichiarato: ' + (chromium || 'non disponibile') + '\n' +
        'Sistema: ' + identifySystem(ua) + '\n' +
        'Area pagina: ' + window.innerWidth + ' x ' + window.innerHeight + '\n\n' +
        report.join('\n') + '\n\nUser-Agent:\n' + ua;
    probes.parentNode.removeChild(probes);
    document.getElementById('state').textContent = 'Verifica completata';
    document.getElementById('state').className = 'yes';
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runBrowserCheck);
} else {
    runBrowserCheck();
}
