/**
 * @description 条形码生成器
 * @lastModified 2023.11.17
 * @author wukongyang
 */

import html2canvas from "html2canvas";
import React, { useEffect,useRef } from "react";
import Taro from "@tarojs/taro";
import JsBarcode from "jsbarcode";

import { ScanCodeProps } from "../../index.type";
import { generateRandomId } from '../../utils/utils'

/**
 * @description 条形码组件
 * @example
 */
const QrCode: React.FC<ScanCodeProps> = ({
  format = "CODE128",
  codeText = "",
  color = "#000",
  backgroundColor = "#fff",
  width = 200,
  height = 100,
  callback,
}) => {
  const randomId = useRef(`custom_code_${generateRandomId()}`)
  useEffect(() => {
    new JsBarcode(`#${randomId.current}`, codeText, {
      displayValue: false,
      background: backgroundColor,
      lineColor: color,
      format,
      margin: 0,
    });
    html2canvas(document.getElementById(randomId.current) as HTMLElement, {
      backgroundColor: "#fff", //画出来的图片有白色的边框,不要可设置背景为透明色（null）
      useCORS: true, //支持图片跨域
      scale: 1, //设置放大的倍数
    }).then((canvas) => {
      let src = canvas.toDataURL("image/jpg");
      callback?.(src);
    });
  }, []);
  return (
    <canvas
      style={{
        width: Taro.pxTransform(width),
        height: Taro.pxTransform(height),
      }}
      id={randomId.current}
    ></canvas>
  );
};

export default QrCode;
