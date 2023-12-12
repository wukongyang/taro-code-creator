import { ComponentType } from "react";

import { QrCodeProps as CodeProps } from "./index.type";

let implementation;
if (process.env.TARO_ENV === "rn") {
  implementation = require("./lib/rn");
}if (process.env.TARO_ENV === "h5") {
    implementation = require("./lib/h5");
  } else {
  implementation = require("./lib/mp");
}

export interface QrCodeProps extends CodeProps {}

const QrCode: ComponentType<QrCodeProps> =
  implementation.default || implementation;

export default QrCode;
