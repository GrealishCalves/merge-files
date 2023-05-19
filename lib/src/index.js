#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { program } = require('commander');

program.arguments('<inputDir> <outputFilePath>').action((inputDir, outputFilePath) => {
  const inputDirPath = path.resolve(process.cwd(), inputDir);
  const outputFilePathResolved = path.resolve(process.cwd(), outputFilePath);
  const mergedContent = mergeTypeScriptFiles(inputDirPath, outputFilePathResolved);
  fs.writeFileSync(outputFilePathResolved, mergedContent, 'utf8');
});

const mergeTypeScriptFiles = (dir, outputFile) => {
  const tsFiles = [];

  const walkDir = (currentDir) => {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isFile() && entry.name.endsWith('.ts')) {
        tsFiles.push(fullPath);
      } else if (entry.isDirectory()) {
        walkDir(fullPath);
      }
    }
  };

  const processTsFile = (tsFile) => {
    const content = fs.readFileSync(tsFile, 'utf8');
    const lines = content.split('\n');
    const outputLines = [];
    let importSection = true;

    // Get the relative path of the current file
    const relativePath = path.relative(dir, tsFile);

    // Split the path by the directory separator and add a comment for each parent directory
    const parentDirs = relativePath.split(path.sep).slice(0, -1);
    for (let i = 0; i < parentDirs.length; i++) {
      const parentPath = parentDirs.slice(0, i + 1).join('/');
      outputLines.push(`// ${parentPath}`);
    }

    // Add a comment for the file itself
    const fileName = path.basename(tsFile, '.ts');
    const fileDir = path.dirname(relativePath);
    const filePath = fileDir ? `${fileDir}/${fileName}.ts` : `${fileName}.ts`;
    outputLines.push(`// ${filePath}`);

    for (const line of lines) {
      if (importSection && line.startsWith('import ')) {
        // Remove import statements
      } else {
        if (importSection) {
          importSection = false;
        }
        outputLines.push(line);
      }
    }

    // Compute the relative path of the current file with respect to the output file
    const relativeOutputPath = path.relative(path.dirname(outputFile), tsFile);

    // Replace the absolute path with the relative path in the comments
    const output = outputLines.join('\n').replace(new RegExp(tsFile, 'g'), relativeOutputPath);

    return output;
  };

  walkDir(dir);

  const mergedContent = tsFiles.map(processTsFile).join('\n\n');

  return mergedContent;
};

program.parse(process.argv);
