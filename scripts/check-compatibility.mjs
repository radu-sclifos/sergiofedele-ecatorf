import fs from 'node:fs';
import path from 'node:path';

// Guard the project's conservative CSS policy, not a browser certification.
const forbidden = [
    ['modern viewport units', /\b\d*\.?\d+[sdl]v[wh]\b/i],
    ['relational selectors', /:has\s*\(/i],
    ['min() and max() sizing functions', /\b(?:min|max)\s*\(/i],
    ['logical spacing properties', /(?:margin|padding|border|inset)-(?:inline|block)[\w-]*\s*:/i],
    ['inset shorthand', /(?:^|[;{])\s*inset\s*:/i],
    ['individual transforms', /(?:^|[;{])\s*(?:translate|rotate|scale)\s*:/i],
    ['range media queries', /@media[^{}]*[<>]/i],
    ['modern focus selector', /:focus-visible\b/i],
];

function* files(directory) {
    for (const entry of fs.readdirSync(directory, {withFileTypes: true})) {
        const file = path.join(directory, entry.name);
        if (entry.isDirectory()) yield* files(file);
        else yield file;
    }
}

let failures = 0;
let checked = 0;
for (const directory of ['src', 'dist']) {
    if (!fs.existsSync(directory)) continue;
    for (const file of files(directory)) {
        if (!/\.(?:astro|css|html)$/.test(file)) continue;
        const text = fs.readFileSync(file, 'utf8');
        const styles = file.endsWith('.css') ? [text] : Array.from(text.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/g), match => match[1]);
        for (const css of styles) {
            checked++;
            for (const [feature, pattern] of forbidden) {
                if (pattern.test(css)) {
                    console.error(`${file}: ${feature}`);
                    failures++;
                }
            }
        }
    }
}
if (failures) process.exitCode = 1;
else console.log(`Compatibility policy passed for ${checked} source and production stylesheets.`);
