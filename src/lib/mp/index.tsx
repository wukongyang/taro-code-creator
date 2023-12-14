

import React from "react";

import QrCode from "./qrcode";
import Barcode from "./barcode";
import { ScanCodeProps } from "../../index.type";

const ScanCode: React.FC<ScanCodeProps> = (props) => {
  return (
    <>{props.type === "bar" ? <Barcode {...props}></Barcode> : <QrCode {...props} />}</>
  );
};

export default ScanCode;
