const {
  FuseBox,
  WebIndexPlugin,
  QuantumPlugin,
  EnvPlugin,
  CopyPlugin,
  CSSPlugin,
  SassPlugin,
  CSSResourcePlugin
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
        bakeApiIntoBundle: "app",
        treeshake: true,
        removeExportsInterop: false,
        uglify: {
          es6: true
        }
      }),
    [SassPlugin(), CSSPlugin()],
    WebIndexPlugin({
      template: `src/resources/page/app.html`,
      path: production ? "." : "/",
      target: `app.html`
    }),
    CopyPlugin({
      files: ["*.woff2", "*.png", "*.svg"],
      dest: "assets",
      resolve: production ? "./assets" : "/assets"
    })
  ]
};

const fuse = FuseBox.init(config);

if (!production) {
  fuse.dev({ httpServer: true });
}

const app = fuse.bundle("app").instructions("> index.ts");

if (!production) {
  app.hmr().watch();
}

fuse.run();
