/**
 * @description 二维码生成器
 * @lastModified 2023.11.17
 * @author wukongyang
 */

import React, { useEffect, useRef } from "react";
import Taro from "@tarojs/taro";

import QrCodeCom from "../../utils/rn_qrcode/index.js";

import { ScanCodeProps } from "../../index.type";
/**
 * @description 二维码组件
 * @example
 * <QrCode codeText={'test_text'} />
 */
const QrCode: React.FC<ScanCodeProps> = ({
  size = 200,
  logo = "",
  logoSize = 60,
  codeText,
  callback = () => {},
  backgroundColor = "#fff",
  color = "#000",
}) => {
  const QrCodeRef = useRef<any>(null);
  useEffect(() => {
    QrCodeRef.current?.toDataURL(callback);
  }, [QrCodeRef.current, callback]);

  return (
    <QrCodeCom
      size={parseFloat(Taro.pxTransform(size))}
      value={codeText}
      logo={{ uri: logo }}
      logoSize={parseFloat(Taro.pxTransform(logoSize))}
      getRef={(c) => (QrCodeRef.current = c)}
      logoBackgroundColor='transparent'
      backgroundColor={backgroundColor}
      color={color}
    />
  );
};

export default QrCode;
