/**
 * @description 二维码生成器
 * @lastModified 2023.11.17
 * @author wukongyang
 */

import html2canvas from "html2canvas";
import React, { useEffect,useRef } from "react";
import Taro from "@tarojs/taro";
import QRCode from "qrcodejs2";

import { ScanCodeProps } from "../../index.type";
import { generateRandomId } from '../../utils/utils'

/**
 * @description 二维码组件
 * @example
 * <QrCode codeText={'test_text'} />
 */
const QrCode: React.FC<ScanCodeProps> = ({
  size = 200,
  logo = "",
  logoSize = 60,
  codeText = "",
  callback,
  color = "#000",
  backgroundColor = "#fff",
}) => {
  const randomId = useRef(`custom_code_${generateRandomId()}`)
  const randomWarpId = useRef(`custom_code_${generateRandomId()}`)

  const systemInfo = Taro.getSystemInfoSync();
  const ratio = systemInfo.screenWidth / 750;
  const sizeNumber = ratio * size;
  const logoSizeNumber = ratio * logoSize;
  useEffect(() => {

    new QRCode(randomId.current, {
      text: codeText,
      width: sizeNumber,
      height: sizeNumber,
      colorDark: color,
      colorLight: backgroundColor,
      correctLevel: QRCode.CorrectLevel.H,
    });
    html2canvas(document.getElementById(randomWarpId.current) as HTMLElement, {
      backgroundColor: "#fff", //画出来的图片有白色的边框,不要可设置背景为透明色（null）
      useCORS: true, //支持图片跨域
      scale: 1, //设置放大的倍数
    }).then((canvas) => {
      let src = canvas.toDataURL("image/jpg");
      callback?.(src);
    });
  }, []);
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      id={randomWarpId.current}
    >
      <div id={randomId.current}></div>
      {logo && (
        <img
          style={{
            width: `${logoSizeNumber}px`,
            height: `${logoSizeNumber}px`,
            position: "absolute",
          }}
          src={logo}
          alt='logo'
        />
      )}
    </div>
  );
};

export default QrCode;
