#! /usr/bin/env node

import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import svgr from '@svgr/core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const iconsFilepath = path.resolve(__dirname, '../icons');
const svgFilepath = path.resolve(iconsFilepath, './svg');
const componentsFilepath = path.resolve(iconsFilepath, './components');

(async () => {
  const files = await fs.promises.readdir(svgFilepath);
  const svgFiles = files.filter((file) => file.endsWith('.svg'));
  const svgContents = await Promise.all(
    svgFiles.map((file) => fs.promises.readFile(path.resolve(svgFilepath, file), 'utf8')),
  );
  const jsContents = await Promise.all(
    svgContents.map((svgContent, i) =>
      svgr.transform(
        svgContent,
        { icon: true, typescript: true },
        {
          componentName: getComponentName(svgFiles[i]),
        },
      ),
    ),
  );

  // (props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>)

  await writeJsFiles({ jsContents, svgFiles });

  await writeIndexFile(svgFiles);
})();

async function writeJsFiles({ jsContents, svgFiles }) {
  const jsFiles = svgFiles.map((file) => file.replace('.svg', '.tsx'));

  await fs.promises.rm(componentsFilepath, { recursive: true });
  await fs.promises.mkdir(componentsFilepath);

  await Promise.all(
    jsFiles.map((jsFile, i) => {
      fs.promises.writeFile(path.resolve(componentsFilepath, jsFile), jsContents[i]);
    }),
  );
}

async function writeIndexFile(svgFiles) {
  const indexFile = path.resolve(iconsFilepath, 'index.tsx');
  const indexContent = svgFiles.reduce((acc, file) => {
    const name = getComponentName(file);
    return `${acc}\nexport { default as ${name} } from './components/${file.replace('.svg', '')}';`;
  }, '');

  await fs.promises.writeFile(indexFile, indexContent);
}

function getComponentName(filename) {
  const name = filename.replace('.svg', '');
  const nameParts = name.split('-').map(capitalizeFirstLetter);

  return `${nameParts.join('')}Icon`;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
