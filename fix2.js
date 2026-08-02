const fs = require('fs');
let code = fs.readFileSync('src/lib/queries.ts', 'utf8');

// Replace .select("*", currentLocale) with .select("*")
code = code.replace(/\.select\("\*",\s*currentLocale\)/g, '.select("*")');
code = code.replace(/\.select\('\*',\s*currentLocale\)/g, '.select("*")');

// Replace (data, currentLocale, currentLocale)
code = code.replace(/\(data,\s*currentLocale,\s*currentLocale\)/g, '(data, currentLocale)');

// Check for left side of comma operator
// Let's print out lines that might contain ", currentLocale)" without data
const lines = code.split('\n');
let modified = false;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('localizeData(, currentLocale)')) {
    lines[i] = lines[i].replace('localizeData(, currentLocale)', 'localizeData(data, currentLocale)');
    modified = true;
  }
  if (lines[i].match(/^\s*return await localizeData\(\w*,\s*currentLocale\);\s*$/) === null) {
    if (lines[i].includes('localizeData') && lines[i].includes(', currentLocale)')) {
       // Just to be safe, if there's any stray `, currentLocale` inside an empty param call
       lines[i] = lines[i].replace(/\(\s*,\s*currentLocale\)/g, '(data, currentLocale)');
    }
  }
}
code = lines.join('\n');

// Specific fix for TS2695: "Left side of comma operator is unused and has no side effects."
// It means there is something like `(some_var, currentLocale)` where `some_var` is just a variable but not part of a function call?
// Wait, if it's `localizeData(data, currentLocale)`, the comma operator error ONLY happens if it's NOT a function call!
// Wait! `await localizeData`
// If it is `await localizeData(data, currentLocale)` that is perfectly valid function syntax.
// BUT what if `localizeData` was stripped?
// like `return await (data, currentLocale)` ???
// YES! If `localizeData` was stripped out!
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('await (data, currentLocale)')) {
    lines[i] = lines[i].replace('await (data, currentLocale)', 'await localizeData(data, currentLocale)');
    modified = true;
  }
}
code = lines.join('\n');

fs.writeFileSync('src/lib/queries.ts', code);
console.log('Fixed syntax errors.');
