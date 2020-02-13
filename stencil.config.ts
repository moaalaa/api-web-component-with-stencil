import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'api-web-component-with-stencil',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme',
      strict: true
    },
    // {
    //   type: 'docs-custom',
    //   strict: true,
    //   generator: (docs: JsonDocs) => {
    //       console.log(docs);
    //   }
    // }
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};
