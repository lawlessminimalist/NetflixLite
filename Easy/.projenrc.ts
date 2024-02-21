import { awscdk } from 'projen';
import { NodePackageManager } from 'projen/lib/javascript';

const project = new awscdk.AwsCdkTypeScriptApp({
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'Easy',
  projenrcTs: true,
  github: false,
  license: 'Apache-2.0',
  packageManager: NodePackageManager.NPM,

  deps: [
    "tailwindcss",
    "postcss",
    "autoprefixer"
  ],                
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();