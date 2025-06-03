import esbuildPluginTsc from 'esbuild-plugin-tsc';

export default () => ({
  bundle: true,
  minify: false,
  sourcemap: false,
  exclude: ['@aws-sdk/*'],
  external: ['@aws-sdk/*'],
  plugins: [esbuildPluginTsc()],
});
