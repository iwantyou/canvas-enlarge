import typesctipt from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";

const { NODE_ENV } = process.env;
const golbals = {
    react: "React",
    "react-dom": "ReactDom",
};

const createConfig = format => {
    let config = {
        input: "./src/index.tsx",
        output: { file: `${format}/${pkg.name}.js`, sourcemap: true, format },
        external: Object.keys(golbals),
        plugins: [resolve(), commonjs(), typesctipt()],
    };
    if (format === "umd" || format === "iife") {
        config.output.golbals = golbals;
    }
    return config;
};
let config;
switch (NODE_ENV) {
    case "umd":
        config = createConfig("umd");
        break;
    case "cjs":
        config = createConfig("cjs");
        break;
    case "esm":
        config = createConfig("esm");
        break;
    default:
        config = [createConfig("cjs"), createConfig("esm")];
}
export default config;
