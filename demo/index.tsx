import React from "react";
import ReactDom from "react-dom";
import CavansEnlarge from "../src/index";
import img from "./a.png";

ReactDom.render(<CavansEnlarge imgSource={img} />, document.getElementById("app"))