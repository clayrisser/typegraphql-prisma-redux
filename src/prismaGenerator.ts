import fs from 'fs-extra';
import path from 'path';
import { DMMF } from '@prisma/photon/runtime';
import { GeneratorOptions } from '@prisma/generator-helper';
import generateCode from './generator/generateCode';

export async function generate(options: GeneratorOptions) {
  const outputPath = options.generator.output!;
  await fs.mkdirp(outputPath);
  await fs.remove(outputPath);
  // eslint-disable-next-line import/no-dynamic-require,global-require
  const photonDmmf = require(options.otherGenerators.find(
    it => it.provider === 'photonjs'
  )!.output!).dmmf as DMMF.Document;
  if (options.generator.config.emitDMMF) {
    await Promise.all([
      fs.writeFile(
        path.resolve(outputPath, 'dmmf.json'),
        JSON.stringify(options.dmmf, null, 2)
      ),
      fs.writeFile(
        path.resolve(outputPath, 'photon-dmmf.json'),
        JSON.stringify(photonDmmf, null, 2)
      )
    ]);
  }
  await generateCode(photonDmmf, outputPath);
}
