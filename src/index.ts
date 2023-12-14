import { ComponentType } from "react";

import { ScanCodeProps } from "./index.type";


let implementation;
if (process.env.TARO_ENV === "rn") {
  implementation = require("./lib/rn");
} else if (process.env.TARO_ENV === "h5") {
  implementation = require("./lib/h5");
} else {
  implementation = require("./lib/mp");
}

export interface ScanCodeProp extends ScanCodeProps {}

const QrCode: ComponentType<ScanCodeProps> =
  implementation.default || implementation;

export default QrCode;
