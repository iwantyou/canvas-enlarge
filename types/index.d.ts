import * as React from "react";
export interface ImgEnlargAndRotate {
    imgSource: any;
    width?: number;
    height?: number;
    scale?: number;
    mouseSize?: number;
    containerDirction?: "left" | "bottom";
}
declare const ImgEnlargAndRotate: React.FC<ImgEnlargAndRotate>;
export default ImgEnlargAndRotate;