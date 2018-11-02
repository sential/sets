const {
  FuseBox,
  WebIndexPlugin,
  QuantumPlugin,
  EnvPlugin,
  CopyPlugin
} = require("fuse-box");

const production = process.env.NODE_ENV === "dev" ? false : true;

const config = {
  homeDir: "src/",
  cache: !production,
  target: "browser@es6",
  output: `build/$name.js`,
  tsConfig: "./tsconfig.json",
  sourceMaps: !production,
  useTypescriptCompiler: true,
  plugins: [
    EnvPlugin({ NODE_ENV: production ? "production" : "development" }),
    production &&
      QuantumPlugin({
        bakeApiIntoBundle: "index",
        treeshake: true,
        removeExportsInterop: false,
        uglify: {
          es6: true
        }
      }),
    WebIndexPlugin({
      template: `src/resources/page/app.html`,
      path: production ? "." : "/",
      target: `index.html`
    }),
    CopyPlugin({
      files: ["*.woff2", "*.woff", "*.png", "*.svg"],
      dest: "assets",
      resolve: production ? "./assets" : "/assets"
    })
  ]
};

const fuse = FuseBox.init(config);

if (!production) {
  fuse.dev({ httpServer: true });
}

const app = fuse.bundle("index").instructions("> index.tsx");

if (!production) {
  app.hmr().watch();
}

fuse.run();
