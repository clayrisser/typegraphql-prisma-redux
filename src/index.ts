import { generatorHandler } from '@prisma/generator-helper';
import { generate } from './prismaGenerator';

generatorHandler({
  onManifest: () => ({
    defaultOutput: 'node_modules/@generated/redux',
    prettyName: 'redux integration',
    requiresGenerators: ['photon', 'typegraphql']
  }),
  onGenerate: generate
});
