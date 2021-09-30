import typesctipt from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import terser from "rollup-plugin-terser";
import pkg from "./package.json";

const { NODE_ENV, BUILD_FORMAT } = process.env;
const golbals = {
    react: "React",
    "react-dom": "ReactDom",
};

const createConfig = (format, env) => {
    let config = {
        input: "./src/index.tsx",
        output: { file: `${format}/${pkg.name}.js`, sourcemap: true, format },
        external: Object.keys(golbals),
        plugins: [resolve(), commonjs(), typesctipt(), env === "production" && terser()],
    };
    if (format === "umd" || format === "iife") {
        config.output.golbals = golbals;
    }
    if(env === "production"){
        config.output.file = `${format}/${pkg.name}.min.js`
    }
    return config;
};
let config;
switch (BUILD_FORMAT) {
    case "umd":
        config = createConfig("umd");
        break;
    case "cjs":
        config = [createConfig("cjs"), createConfig("cjs", NODE_ENV)];
        break;
    case "esm":
        config = createConfig("esm");
        break;
    default:
        config = [createConfig("cjs"), createConfig("esm")];
}
export default config;
