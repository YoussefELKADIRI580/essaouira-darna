const fs = require('fs');
let code = fs.readFileSync('src/lib/queries.ts', 'utf8');

// Find the start of Write functions
const writeIndex = code.indexOf('// INSERT / UPDATE FUNCTIONS (Write)');

let readCode = code.substring(0, writeIndex);
let writeCode = code.substring(writeIndex);

readCode = readCode.replace(/return data;/g, 'return await localizeData(data);');
readCode = readCode.replace(/return data \?\? \[\];/g, 'return await localizeData(data ?? []);');
readCode = readCode.replace(/return \{ \.\.\.project, supplies: supplies \?\? \[\] \};/g, 'return await localizeData({ ...project, supplies: supplies ?? [] });');
readCode = readCode.replace(/return projects\.map\(\(project\) => \(\{\s+\.\.\.project,\s+supplies: \(supplies \?\? \[\]\)\.filter\(\(s\) => s\.project_id === project\.id\),\s+\}\)\);/g, 'return await localizeData(projects.map((project) => ({\n    ...project,\n    supplies: (supplies ?? []).filter((s) => s.project_id === project.id),\n  })));');

fs.writeFileSync('src/lib/queries.ts', readCode + writeCode);
console.log('Queries updated successfully.');
