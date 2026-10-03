import { Project, SyntaxKind } from 'ts-morph';

const import_from = 'commandkit';
const methods = ['log', 'info', 'warn', 'error', 'debug'];
const project = new Project({ tsConfigFilePath: 'tsconfig.json' });

for (const file of project.getSourceFiles('src/**/*.{ts,tsx}')) {
  const targets = file
    .getDescendantsOfKind(SyntaxKind.PropertyAccessExpression) //* PAE: anything accessed like thing.property; in this case, console.log, console.info, etc
    .filter((expr) => expr.getExpression().getText() === 'console' && methods.includes(expr.getName())).reverse();

  if (targets.length === 0) continue;

  for (const node of targets) {
    node.replaceWithText(`Logger.${node.getName()}`);
  }

  const alreadyImported = file
    .getImportDeclarations()
    .some((d) => d.getNamedImports().some((i) => i.getName() === 'Logger'));

  if (!alreadyImported) {
    const existing = file.getImportDeclaration(import_from);
    if (existing) existing.addNamedImport('Logger');
    else file.addImportDeclaration({
      moduleSpecifier: import_from,
      namedImports: ['Logger'],
    });
  }

  console.log(`\x1b[1;37;45m[UPDATE LOGS]\x1b[0m Updated ${file.getFilePath()}`);
}

await project.save();