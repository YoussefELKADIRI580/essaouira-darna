const fs = require('fs');

async function fixQueries() {
  let code = fs.readFileSync('src/lib/queries.ts', 'utf8');

  // Change localizeData signature
  code = code.replace(
    /export async function localizeData<T>\(data: T\): Promise<T> \{/g,
    'export async function localizeData<T>(data: T, explicitLocale?: string): Promise<T> {'
  );

  // Replace getLocale logic inside localizeData
  code = code.replace(
    /let locale = "ar";\s*try \{\s*locale = await getLocale\(\);\s*\} catch \(e\) \{\s*console.error\("\[localizeData\] getLocale error:", e\);\s*\/\/\s*If not in a request context, fallback to 'ar'\s*\}/g,
    `let locale = explicitLocale || "ar";\n  if (!explicitLocale) {\n    try {\n      locale = await getLocale();\n    } catch (e) {\n      console.error("[localizeData] getLocale error:", e);\n    }\n  }`
  );

  // Add currentLocale at top of each exported query function
  code = code.replace(
    /export async function (get[A-Za-z0-9_]+)\((.*?)\)(.*?)\{/g,
    (match, name, args, ret) => {
      // Don't modify getLocale itself if it matches
      if (name === 'getLocale') return match;
      return match + '\n  let currentLocale = "ar";\n  try { currentLocale = await getLocale(); } catch(e) {}\n';
    }
  );

  // Replace await localizeData(data) with await localizeData(data, currentLocale)
  code = code.replace(/localizeData\(([^,]+)\)/g, 'localizeData($1, currentLocale)');

  fs.writeFileSync('src/lib/queries.ts', code);
  console.log('Queries updated successfully.');
}

fixQueries();
