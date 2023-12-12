/**
 * @description 二维码生成器
 * @lastModified 2023.11.17
 * @author wukongyang
 */

import { Canvas } from "@tarojs/components";
import React, { useEffect } from "react";
import Taro from "@tarojs/taro";
import { QrCodeProps } from "../index.type";
import drawQrcode from "../utils/qrcode";

/**
 * @description 二维码组件
 * @example
 * <QrCode codeText={'test_text'} />
 */
const QrCode: React.FC<QrCodeProps> = ({
  size = 200,
  logo = "",
  logoSize = 60,
  codeText = "",
  callback,
  color = "#000",
  backgroundColor = "#fff",
}) => {

  useEffect(() => {
    const sizeNumber = parseFloat(Taro.pxTransform(size)) / 2;
    const logoSizeNumber = parseFloat(Taro.pxTransform(logoSize)) / 2;
    const query = Taro.createSelectorQuery();
    query
      .select("#custom_qrcode")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        canvas.width = sizeNumber;
        canvas.height = sizeNumber;
        const ctx = canvas.getContext("2d");
        const options = {
          width: sizeNumber,
          height: sizeNumber,
          canvasId: "custom_qrcode",
          text: codeText,
          foreground: color,
          background: backgroundColor,
          ctx,
          canvas,
          callback: () => {
            Taro.canvasToTempFilePath({
              canvas,
              success: (r) => {
                callback?.(r.tempFilePath);
              },
            });
          },
        };
        if (logo) {
          Taro.getImageInfo({
            src: logo,
            success(result) {
              drawQrcode({
                ...options,
                image: {
                  imageResource: result.path,
                  dx: sizeNumber / 2 - logoSizeNumber / 2,
                  dy: sizeNumber / 2 - logoSizeNumber / 2,
                  dWidth: logoSizeNumber,
                  dHeight: logoSizeNumber,
                },
              });
            },
          });
        } else {
          drawQrcode(options);
        }
      });
  }, []);
  return (
    <Canvas
      style={{ width: Taro.pxTransform(size), height: Taro.pxTransform(size) }}
      id='custom_qrcode'
      type='2d'
    ></Canvas>
  );
};

export default QrCode;
