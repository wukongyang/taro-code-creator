// @flow
import React, { useState, useEffect, useRef } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import barcodes from "jsbarcode/src/barcodes";
import Taro from "@tarojs/taro";

import { ScanCodeProps } from "../../index.type";

// encode() handles the Encoder call and builds the binary string to be rendered
const encode = (text: string, Encoder: any, options: ScanCodeProps) => {
  // If text is not a non-empty string, throw error.
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("Barcode value must be a non-empty string");
  }

  var encoder;

  try {
    encoder = new Encoder(text, options);
  } catch (error) {
    // If the encoder could not be instantiated, throw error.
    throw new Error("Invalid barcode format.");
  }

  // If the input is not valid for the encoder, throw error.
  if (!encoder.valid()) {
    throw new Error("Invalid barcode for selected format.");
  }
  var encoded = encoder.encode();
  return encoded;
};

const drawSvgBarCode = (encoding: any) => {
  const rects = [] as string[];
  // binary data of barcode
  const binary = encoding.data;

  let barWidth = 0;
  let x = 0;
  let yFrom = 0;

  for (let b = 0; b < binary.length; b++) {
    x = b;
    if (binary[b] === "1") {
      barWidth++;
    } else if (barWidth > 0) {
      rects[rects.length] = drawRect(x - barWidth, yFrom, barWidth, 100);
      barWidth = 0;
    }
  }

  // Last draw is needed since the barcode ends with 1
  if (barWidth > 0) {
    rects[rects.length] = drawRect(x - barWidth + 1, yFrom, barWidth, 100);
  }

  return rects;
};

const drawRect = (x: number, y: number, width: number, height: number) => {
  return `M${x},${y}h${width}v${height}h-${width}z`;
};

export const barcodeToSvg = (options: ScanCodeProps) => {
  const {
    format = "CODE128",
    color = "#000000",
    codeText = "123",
    width = 200,
    height = 100,
  } = options;
  const encoder = barcodes[format];
  const encoded = encode(codeText, encoder, options);

  const bars = drawSvgBarCode(encoded);
  const barCodeWidth = encoded.data.length;

  return `
      <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${barCodeWidth} 100" preserveAspectRatio="xMinYMin slice">
        <path d="${bars.join(" ")}" fill="${color}"/>
      </svg>
    `;
};


/**
 * @description 条形码组件
 * @example
 */
const Barcode = (props: ScanCodeProps) => {
  const {
    format = "CODE128",
    codeText,
    color = "#000000",
    width = 200,
    height = 100,
    backgroundColor = "#fff",
    callback,
  } = props;
  const { ...barcodeProps } = props;
  const [bars, setBars] = useState<string[]>([]);
  const [barCodeWidth, setBarCodeWidth] = useState(0);
  const SvgRef = useRef<any>();

  useEffect(() => {
    const encoder = barcodes[format];
    const encoded = encode(codeText, encoder, barcodeProps);

    if (encoded) {
      setBars(drawSvgBarCode(encoded));
      setBarCodeWidth(encoded.data.length);
    }
  }, [format, codeText, color]);

  useEffect(() => {
    if (SvgRef.current) {
      SvgRef.current.toDataURL(callback);
    }
  }, [SvgRef.current]);

  return (
    <View
      style={{
        width: Taro.pxTransform(width),
        height: Taro.pxTransform(height),
        backgroundColor: backgroundColor,
      }}
    >
      <Svg
        ref={SvgRef}
        width={Taro.pxTransform(width)}
        height={Taro.pxTransform(height)}
        viewBox={`0 0 ${barCodeWidth} 100`}
        preserveAspectRatio='xMinYMin slice'
        fill={color}
      >
        <Path d={bars.join(" ")} />
      </Svg>
    </View>
  );
};

export default Barcode;
