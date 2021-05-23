import * as React from "react";
import { useEventListener } from "./hook";

export interface ImgEnlargAndRotate {
  imgSource: any;
  width?: number;
  height?: number;
  scale?: number;
  mouseSize?: number;
  containerDirction?: "left" | "bottom";
}

const ImgEnlargAndRotate: React.FC<ImgEnlargAndRotate> = (props) => {
  const { imgSource, width = 300, height = 300, scale = 3, mouseSize = 100, containerDirction = "left" } = props;
  const [state, setState] = React.useState<boolean>(false);
  const [xy, setXy] = React.useState({ left: -999999, top: -9999999 });
  const [opacity, setopacity] = React.useState<boolean>(false);

  const container = React.useRef<HTMLCanvasElement>(null);
  const containerCtx = React.useRef<CanvasRenderingContext2D>();
  const scaleContainer = React.useRef<HTMLCanvasElement>(null);
  const scaleCtx = React.useRef<CanvasRenderingContext2D>();
  const divContainer = React.useRef<HTMLDivElement>(null);
  const position = React.useRef<DOMRect>();
  
  const style = React.useMemo<React.CSSProperties>(() => {
    return { width: mouseSize, height: mouseSize, position: "absolute", backgroundColor: "#000", cursor: "pointer", opacity: 0.5, zIndex: 2, ...xy }
  }, [xy])
  const handleCanvasData = (dx: number, dy: number) => {
    let imageData = containerCtx.current!.getImageData(dx, dy, mouseSize, mouseSize);
    let workcanvas = document.createElement("canvas");
    workcanvas.width = imageData!.width;
    workcanvas.height = imageData!.height;
    let workCtx = workcanvas.getContext("2d");
    workCtx!.putImageData(imageData!, 0, 0);
    scaleCtx.current!.clearRect(0, 0, scale * mouseSize, scale * mouseSize);
    scaleCtx.current!.drawImage(workcanvas, 0, 0, scale * mouseSize, scale * mouseSize);
  };
  const getDirction = React.useCallback(() => {
    let offsetTop = container.current?.offsetTop || 0;
    let offsetLeft = container.current?.offsetLeft || 0;
    if (containerDirction === "left") {
      return {
        left: offsetLeft + (position.current?.width || -999999),
        top: offsetTop,
      };
    } else {
      return {
        left: offsetLeft,
        top: offsetTop + (position.current?.height || -999999),
      };
    }
  }, [containerDirction]);
  const copyImageToContainer = React.useCallback(
    (ctx: CanvasRenderingContext2D) => {
      let image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, width, height);
      };
      image.src = imgSource;
    },
    [width, height, imgSource]
  );
  const getAllCtxAndDom = () => {
    let ctx = container.current!.getContext("2d");
    let scal = scaleContainer.current!.getContext("2d");
    position.current = divContainer.current!.getBoundingClientRect();
    if (!ctx || !scal) return;
    containerCtx.current = ctx;
    scaleCtx.current = scal;
    copyImageToContainer(ctx);
  };
  const handleMouseEvent = ({ clientX, clientY }: MouseEvent) => {
    const leftv = Math.max(clientX - position.current!.left, 0) > width - mouseSize / 2 ? width - mouseSize : Math.max(clientX - position.current!.left - mouseSize / 2, 0);
    const topv = Math.max(clientY - position.current!.top, 0) > height - mouseSize / 2 ? height - mouseSize : Math.max(clientY - position.current!.top - mouseSize / 2, 0);
    handleCanvasData(leftv, topv);
    setXy({ left: leftv, top: topv });
  };
  React.useLayoutEffect(() => {
    getAllCtxAndDom();
  }, []);
  useEventListener(
    "mouseleave",
    () => {
      setState(false);
      setopacity(false);
    },
    {
      target: divContainer,
    }
  );
  useEventListener(
    "mouseenter",
    (e: MouseEvent) => {
      setState(true);
      setopacity(true);
    },
    {
      target: divContainer,
    }
  );
  useEventListener("mousemove", handleMouseEvent, {
    target: divContainer,
  });

  return (
    <React.Fragment>
      <div style={{ display: "inline-block", position: "relative" }}>
        <div ref={divContainer} style={{ display: "inline-block" }}>
          <canvas width={width} height={height} style={{ cursor: "pointer" }} ref={container}>
            您的浏览器不支持canvas，请切换浏览器
          </canvas>
          {state && <div style={style}></div>}
        </div>
        <canvas width={scale * mouseSize} height={scale * mouseSize} style={{ position: "absolute", opacity: opacity ? 1 : 0, zIndex: 9999, ...getDirction() }} ref={scaleContainer}>
          您的浏览器不支持canvas，请切换浏览器
        </canvas>
      </div>
    </React.Fragment>
  );
};
export default ImgEnlargAndRotate;
